/** [START] imports */
/** libraries */
import React, {
    useState,
    useEffect,
} from 'react';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconEdit,
    PluridIconDelete,
} from '@plurid/plurid-icons-react';


/** external */
import {
    compareValues,
} from '#server/utilities';

import {
    Deployer,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

import client from '#kernel-services/graphql/client';
import {
    OBLITERATE_TRIGGER,
} from '#kernel-services/graphql/mutate';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';

import {
    getFilterIDs,
} from '#kernel-services/utilities';

/** internal */
/** [END] imports */



const triggerRowRenderer = (
    trigger: Deployer,
    handleObliterateDeployer: (
        id: string,
    ) => void,
) => {
    const {
        id,
        name,
        repository,
        branch,
        path,
        file,
        project,
    } = trigger;

    return (
        <>
            <div>
                {name}
            </div>

            <div>
                {repository}
            </div>

            <div>
                {branch}
            </div>

            <div>
                {path}
            </div>

            <div>
                {file}
            </div>

            <div>
                {project}
            </div>

            <PluridIconEdit
                atClick={() => {}}
            />

            <PluridIconDelete
                atClick={() => handleObliterateDeployer(id)}
            />
        </>
    );
}


const createSearchTerms = (
    triggers: Deployer[],
) => {
    const searchTerms = triggers.map(
        trigger => {
            const {
                id,
                name,
                repository,
                branch,
                path,
            } = trigger;

            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                    repository.toLowerCase(),
                    branch.toLowerCase(),
                    path.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}


/** [START] component */
export interface DeployersViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */
    setGeneralView: any;

    /** optional */
    /** - values */
    /** - methods */
}

export interface DeployersViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateDeployers: Deployer[];
}

export interface DeployersViewDispatchProperties {
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type DeployersViewProperties = DeployersViewOwnProperties
    & DeployersViewStateProperties
    & DeployersViewDispatchProperties;

const DeployersView: React.FC<DeployersViewProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        /** - methods */
        setGeneralView,

        /** optional */
        /** - values */
        /** - methods */

        /** state */
        stateGeneralTheme,
        stateInteractionTheme,
        stateDeployers,

        /** dispatch */
        dispatchRemoveEntity,
    } = properties;


    /** handlers */
    const handleObliterateDeployer = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'trigger',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_TRIGGER,
                variables: {
                    input,
                },
            });
        } catch (error) {
            return;
        }
    }


    /** state */
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateDeployers),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateDeployers.map(
            trigger => triggerRowRenderer(
                trigger,
                handleObliterateDeployer,
            ),
        ),
    );


    /** functions */
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(searchTerms, value);

        const filteredDeployers = stateDeployers.filter(stateDeployer => {
            if (filterIDs.includes(stateDeployer.id)) {
                return true;
            }

            return false;
        });

        const sortedDeployers = filteredDeployers.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedDeployers.map(
                trigger => triggerRowRenderer(
                    trigger,
                    handleObliterateDeployer,
                ),
            ),
        );
    }


    /** effects */
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateDeployers,
        );
        const filteredRows = stateDeployers.map(
            trigger => triggerRowRenderer(
                trigger,
                handleObliterateDeployer,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateDeployers,
    ]);


    /** render */
    const rowsHeader = (
        <>
            <div>
                name
            </div>

            <div>
                repository
            </div>

            <div>
                branch
            </div>

            <div>
                path
            </div>

            <div>
                performer
            </div>

            <div>
                project
            </div>

            <div />

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="2fr 1fr 0.5fr 2fr 2fr 1fr 30px 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no triggers"

            actionButtonText="Generate Deployer"
            actionButtonClick={() => {
                setGeneralView('generate-trigger')
            }}

            filterUpdate={filterUpdate}
        />
    );
}


const mapStateToProperties = (
    state: AppState,
): DeployersViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateDeployers: selectors.data.getDeployers(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): DeployersViewDispatchProperties => ({
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(DeployersView);
/** [END] component */

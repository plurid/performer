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
    PluridIconDelete,
} from '@plurid/plurid-icons-react';


/** external */
import {
    compareValues,
} from '#server/utilities';

import {
    Project,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

import client from '#kernel-services/graphql/client';
import {
    OBLITERATE_PROJECT,
} from '#kernel-services/graphql/mutate';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';

import {
    getFilterIDs,
} from '#kernel-services/utilities';

/** internal */
/** [END] imports */




const projectRowRenderer = (
    project: Project,
    handleProjectObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        name
    } = project;

    return (
        <>
            <div>
                {name}
            </div>

            <PluridIconDelete
                atClick={() => handleProjectObliterate(id)}
            />
        </>
    );
}


const createSearchTerms = (
    projects: Project[],
) => {
    const searchTerms = projects.map(
        project => {
            const {
                id,
                name
            } = project;

            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}


/** [START] component */
export interface ProjectsViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */
    setGeneralView: any;

    /** optional */
    /** - values */
    /** - methods */
}

export interface ProjectsViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateProjects: Project[];
}

export interface ProjectsViewDispatchProperties {
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type ProjectsViewProperties = ProjectsViewOwnProperties
    & ProjectsViewStateProperties
    & ProjectsViewDispatchProperties;

const ProjectsView: React.FC<ProjectsViewProperties> = (
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
        stateProjects,

        /** dispatch */
        dispatchRemoveEntity,
    } = properties;


    /** handlers */
    const handleProjectObliterate = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'project',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_PROJECT,
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
        createSearchTerms(stateProjects),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateProjects.map(
            project => projectRowRenderer(
                project,
                handleProjectObliterate,
            ),
        ),
    );


    /** functions */
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(
            searchTerms,
            value,
        );

        const filteredProjects = stateProjects.filter(stateProject => {
            if (filterIDs.includes(stateProject.id)) {
                return true;
            }

            return false;
        });

        const sortedProjects = filteredProjects.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedProjects.map(
                project => projectRowRenderer(
                    project,
                    handleProjectObliterate,
                ),
            ),
        );
    }


    /** effects */
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateProjects,
        );
        const filteredRows = stateProjects.map(
            project => projectRowRenderer(
                project,
                handleProjectObliterate,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateProjects,
    ]);


    /** render */
    const rowsHeader = (
        <>
            <div>
                name
            </div>

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="auto 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no projects"

            actionButtonText="Generate Project"
            actionButtonClick={() => {
                setGeneralView('generate-project');
            }}

            filterUpdate={filterUpdate}
        />
    );
}


const mapStateToProperties = (
    state: AppState,
): ProjectsViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateProjects: selectors.data.getProjects(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ProjectsViewDispatchProperties => ({
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(ProjectsView);
/** [END] component */

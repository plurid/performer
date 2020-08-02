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
    uuid,
} from '@plurid/plurid-functions';

import {
    PluridComponentProperty,
} from '@plurid/plurid-react';


/** external */
import client from '#kernel-services/graphql/client';
import {
    GET_BUILD_LOGS,
} from '#kernel-services/graphql/query';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
// import actions from '#kernel-services/state/actions';

/** internal */
import {
    StyledBuild,
} from './styled';
/** [END] imports */



/** [START] component */
export interface BuildOwnProperties {
    plurid: PluridComponentProperty;
}

export interface BuildStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
}

export interface BuildDispatchProperties {
}

export type BuildProperties = BuildOwnProperties
    & BuildStateProperties
    & BuildDispatchProperties;

const Build: React.FC<BuildProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** own */
        plurid,

        /** state */
        // stateGeneralTheme,
        // stateInteractionTheme,
    } = properties;

    const {
        id,
    } = plurid.route.plane.parameters;


    /** state */
    const [
        buildLogs,
        setBuildLogs,
    ] = useState<any[]>([]);


    /** effect */
    useEffect(() => {
        const loadLogs = async () => {
            try {
                const input = {
                    value: id,
                };

                const query = await client.query({
                    query: GET_BUILD_LOGS,
                    variables: {
                        input,
                    },
                });

                const response = query.data.getBuildLogs;

                if (!response.status) {
                    return;
                }

                const {
                    data,
                } = response;

                setBuildLogs(data);
            } catch (error) {
                return;
            }
        }

        loadLogs();
    }, [
        id,
    ]);

    /** render */
    return (
        <StyledBuild>
            Build

            <div>
                {buildLogs.map(buildLog => {
                    const {
                        name,
                        data,
                    } = buildLog;

                    return (
                        <div
                            key={uuid.generate()}
                        >
                            <div>
                                {name}
                            </div>

                            <div
                                style={{
                                    whiteSpace: 'pre-line',
                                }}
                            >
                                {data}
                            </div>
                        </div>
                    );
                })}
            </div>
        </StyledBuild>
    );
}


const mapStateToProperties = (
    state: AppState,
): BuildStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): BuildDispatchProperties => ({
});


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(Build);
/** [END] component */

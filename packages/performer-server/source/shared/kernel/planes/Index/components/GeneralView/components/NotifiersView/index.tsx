// #region imports
    // #region libraries
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
    // #endregion libraries


    // #region external
    import {
        compareValues,
    } from '#server/utilities/general';

    import {
        Notifier,
    } from '#server/data/interfaces';

    import {
        getSetup,
    } from '#kernel-services/logic/queries';

    import EntityView from '#kernel-components/EntityView';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    // import actions from '#kernel-services/state/actions';

    import {
        getFilterIDs,
    } from '#kernel-services/utilities';
    // #endregion external


    // #region internal
    import {
        imageneRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface NotifiersViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

export interface NotifiersViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateNotifiers: Notifier[];
}

export interface NotifiersViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
}

export type NotifiersViewProperties = NotifiersViewOwnProperties
    & NotifiersViewStateProperties
    & NotifiersViewDispatchProperties;

const NotifiersView: React.FC<NotifiersViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            // #endregion values

            // #region methods
            setGeneralView,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional

        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateNotifiers,
        // #endregion state

        // #region dispatch
        dispatch,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region state
    const handleImageneObliterate = (
        id: string,
    ) => {
    }
    // #endregion state


    // #region state
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateNotifiers),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateNotifiers.map(
            imagene => imageneRowRenderer(
                imagene,
                handleImageneObliterate,
            ),
        ),
    );
    // #endregion state


    // #region handlers
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(
            searchTerms,
            value,
        );

        const filteredNotifiers = stateNotifiers.filter(stateImagene => {
            if (filterIDs.includes(stateImagene.id)) {
                return true;
            }

            return false;
        });

        const sortedNotifiers = filteredNotifiers.sort(
            compareValues('date', 'desc'),
        );

        setFilteredRows(
            sortedNotifiers.map(
                imagene => imageneRowRenderer(
                    imagene,
                    handleImageneObliterate,
                ),
            ),
        );
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateNotifiers,
        );
        const filteredRows = stateNotifiers.map(
            imagene => imageneRowRenderer(
                imagene,
                handleImageneObliterate,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateNotifiers,
    ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <div>
                type
            </div>

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="auto 120px 120px 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no notifiers"

            actionButtonText="Setup Notifier"
            actionButtonClick={() => {
                setGeneralView('setup-notifier');
            }}

            filterUpdate={filterUpdate}
            refresh={() => {
                getSetup(dispatch);
            }}
        />
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): NotifiersViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateNotifiers: selectors.data.getNotifiers(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): NotifiersViewDispatchProperties => ({
    dispatch,
});


const ConnectedNotifiersView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(NotifiersView);
// #endregion module



// #region exports
export default ConnectedNotifiersView;
// #endregion exports

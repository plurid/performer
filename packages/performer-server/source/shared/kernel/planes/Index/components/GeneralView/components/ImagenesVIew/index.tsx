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
        Imagene,
    } from '#server/data/interfaces';

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
export interface ImagenesViewOwnProperties {
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

export interface ImagenesViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateImagenes: Imagene[];
}

export interface ImagenesViewDispatchProperties {
}

export type ImagenesViewProperties = ImagenesViewOwnProperties
    & ImagenesViewStateProperties
    & ImagenesViewDispatchProperties;

const ImagenesView: React.FC<ImagenesViewProperties> = (
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
        stateImagenes,
        // #endregion state
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
        createSearchTerms(stateImagenes),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateImagenes.map(
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

        const filteredImagenes = stateImagenes.filter(stateImagene => {
            if (filterIDs.includes(stateImagene.id)) {
                return true;
            }

            return false;
        });

        const sortedImagenes = filteredImagenes.sort(
            compareValues('date', 'desc'),
        );

        setFilteredRows(
            sortedImagenes.map(
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
            stateImagenes,
        );
        const filteredRows = stateImagenes.map(
            imagene => imageneRowRenderer(
                imagene,
                handleImageneObliterate,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateImagenes,
    ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <div>
                name
            </div>

            <div>
                version
            </div>

            <div>
                size
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
            noRows="no imagenes"

            actionButtonText="Add Imagene"
            actionButtonClick={() => {
                setGeneralView('add-imagene');
            }}

            filterUpdate={filterUpdate}
        />
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ImagenesViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateImagenes: selectors.data.getImagenes(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ImagenesViewDispatchProperties => ({
});


const ConnectedImagenesView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(ImagenesView);
// #endregion module



// #region exports
export default ConnectedImagenesView;
// #endregion exports

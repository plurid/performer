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
    Imagene,
} from '#server/data/interfaces';

import EntityView from '#kernel-components/EntityView';

import { AppState } from '#kernel-services/state/store';
import selectors from '#kernel-services/state/selectors';
import actions from '#kernel-services/state/actions';

import {
    getFilterIDs,
} from '#kernel-services/utilities';

/** internal */
/** [END] imports */



const imageneRowRenderer = (
    imagene: Imagene,
    handleImageneObliterate: any,
) => {
    const {
        id,
        name,
        version,
        size,
    } = imagene;

    return (
        <>
            <div>
                {name}
            </div>

            <div>
                {version}
            </div>

            <div>
                {size}
            </div>

            <PluridIconDelete
                atClick={() => handleImageneObliterate(id)}
            />
        </>
    );
}


const createSearchTerms = (
    imagenes: Imagene[],
) => {
    const searchTerms = imagenes.map(
        imagene => {
            const {
                id,
                name,
                version,
                size,
            } = imagene;


            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                    version.toLowerCase(),
                    size,
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}


/** [START] component */
export interface ImagenesViewOwnProperties {
    /** required */
    /** - values */
    /** - methods */
    setGeneralView: any;

    /** optional */
    /** - values */
    /** - methods */
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
        stateImagenes,

        /** dispatch */
    } = properties;


    /** handlers */
    const handleImageneObliterate = (
        id: string,
    ) => {
    }


    /** state */
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


    /** functions */
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


    /** effects */
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


    /** render */
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


export default connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(ImagenesView);
/** [END] component */

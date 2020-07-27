/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconValid,
    PluridIconLocked,
} from '@plurid/plurid-icons-react';


/** external */
import {
    Repository as IRepository,
} from '#server/data/interfaces';


/** internal */
import {
    StyledRepositoryItem,
    StyledRepositoryIcon,
} from './styled';
/** [END] imports */



/** [START] component */
export interface RepositoryItemProperties {
    /** required */
    /** - values */
    theme: Theme;
    data: IRepository;
    selected: boolean;
    /** - methods */
    select: (
        id: string,
    ) => void;

    /** optional */
    /** - values */
    /** - methods */
}

const RepositoryItem: React.FC<RepositoryItemProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        data,
        selected,
        /** - methods */
        select,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;

    const {
        id,
        name,
        isPrivate,
    } = data;


    /** render */
    return (
        <StyledRepositoryItem
            theme={theme}
            onClick={() => select(id)}
        >
            <StyledRepositoryIcon>
                {selected && (
                    <PluridIconValid />
                )}
            </StyledRepositoryIcon>

            <div>
                {name}
            </div>

            <StyledRepositoryIcon>
                {isPrivate && (
                    <PluridIconLocked />
                )}
            </StyledRepositoryIcon>
        </StyledRepositoryItem>
    );
}


export default RepositoryItem;
/** [END] component */

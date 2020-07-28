/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridTextline,
    PluridPureButton,
} from '@plurid/plurid-ui-react';

import {
    PluridIconDelete,
} from '@plurid/plurid-icons-react';


/** external */
import {
    ClientProvider,
} from '#server/data/interfaces';


/** internal */
import {
    StyledEntityView,
    StyledEntityList,
    StyledEntityListItem,
    StyledActionButton,
} from './styled';
/** [END] imports */



/** [START] component */
export interface EntityViewProperties {
    /** required */
    /** - values */
    generalTheme: Theme;
    interactionTheme: Theme;

    rowsHeader: any;
    rowTemplate: string;
    rows: any[];

    actionButtonText?: string;
    /** - methods */
    actionButtonClick?: any;
    filterUpdate?: any;

    /** optional */
    /** - values */
    /** - methods */
}

const EntityView: React.FC<EntityViewProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        generalTheme,
        interactionTheme,

        rowsHeader,
        rowTemplate,
        rows,

        actionButtonText,
        /** - methods */
        actionButtonClick,
        filterUpdate,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** state */
    const [
        searchValue,
        setSearchValue,
    ] = useState('');


    /** render */
    return (
        <StyledEntityView
            theme={generalTheme}
        >
            <PluridTextline
                text={searchValue}
                placeholder="filter"
                atChange={(event) => {
                    const {
                        value,
                    } = event.target;

                    setSearchValue(value);

                    if (filterUpdate) {
                        filterUpdate(value);
                    }
                }}
                theme={interactionTheme}
                spellCheck={false}
                autoCapitalize="false"
                autoComplete="false"
                autoCorrect="false"
                level={2}
                style={{
                    width: '300px',
                    marginBottom: '30px',
                }}
            />

            <StyledEntityList
                theme={generalTheme}
            >
                <ul>
                    <StyledEntityListItem
                        rowTemplate={rowTemplate}
                    >
                        {rowsHeader}
                    </StyledEntityListItem>

                    {rows.map(row => {
                        return (
                            <StyledEntityListItem
                                key={Math.random() + ''}
                                rowTemplate={rowTemplate}
                            >
                                {row}
                            </StyledEntityListItem>
                        );
                    })}
                </ul>
            </StyledEntityList>

            {actionButtonText && (
                <StyledActionButton>
                    <PluridPureButton
                        text={actionButtonText}
                        atClick={() => actionButtonClick
                            ? actionButtonClick() : undefined
                        }
                        theme={interactionTheme}
                        level={2}
                    />
                </StyledActionButton>
            )}
        </StyledEntityView>
    );
}


export default EntityView;
/** [END] component */

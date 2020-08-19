// #region imports
import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';
// #endregion imports



// #region module
export interface IStyledEntityView {
    theme: Theme;
}

export const StyledEntityView = styled.div<IStyledEntityView>`
    position: relative;
    height: 100%;

    button {
        font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;


export interface IStyledEntityList {
    theme: Theme;
}

export const StyledEntityList = styled.div<IStyledEntityList>`
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        max-height: 530px;
        overflow: auto;

        background-color: ${
            ({
                theme,
            }: IStyledEntityList) => theme.backgroundColorSecondaryAlpha
        };
        box-shadow: ${
            ({
                theme,
            }: IStyledEntityList) => theme.boxShadowUmbraInset
        };
    }

    li:first-child {
        background-color: ${
            ({
                theme,
            }: IStyledEntityList) => theme.backgroundColorTertiary
        };
    }

    li:hover:not(:first-child) {
        background-color: ${
            ({
                theme,
            }: IStyledEntityList) => theme.backgroundColorPrimary
        };
    }
`;


export interface IStyledEntityListItem {
    rowTemplate: string;
}

export const StyledEntityListItem = styled.li<IStyledEntityListItem>`
    display: grid;
    grid-template-columns: ${
        ({
            rowTemplate,
        }: IStyledEntityListItem) => rowTemplate
    };
    grid-gap: 0.5rem;
    padding: 0.7rem;
    align-items: center;
    min-height: 45px;
    word-break: break-all;
`;


export const StyledActionButton = styled.div`
    width: 200px;
    position: absolute;
    bottom: 0;
    right: 0;
`;


export const StyledNoRows = styled.div`
    margin: 20px 0;
    text-align: center;
`;
// #endregion module

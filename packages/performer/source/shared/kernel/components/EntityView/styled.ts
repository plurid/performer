import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledEntityView {
    theme: Theme;
}

export const StyledEntityView = styled.div<IStyledEntityView>`
    position: relative;
    height: 100%;
`;


export interface IStyledEntityList {
    theme: Theme;
}

export const StyledEntityList = styled.div<IStyledEntityList>`
    ul {
        padding: 0;
        margin: 0;
        list-style: none;

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
    padding: 0.7rem;
    align-items: center;
    min-height: 45px;
`;


export const StyledActionButton = styled.div`
    width: 200px;
    position: absolute;
    bottom: 0;
    right: 0;
`;

import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledGeneralView {
}

export const StyledGeneralView = styled.div<IStyledGeneralView>`
    display: grid;
    grid-template-columns: 1fr 4fr;
    min-height: 500px;
`;


export interface IStyledGeneralSelectors {
    theme: Theme;
}

export const StyledGeneralSelectors = styled.div<IStyledGeneralSelectors>`
    background-color: ${
        ({
            theme,
        }: IStyledGeneralSelectors) => theme.backgroundColorTertiary
    };
    box-shadow: inset -3px 0px 3px 0px ${
        ({
            theme,
        }: IStyledGeneralSelectors) => theme.boxShadowUmbraColor
    };

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
`;


export interface IStyledGeneralSelectorItem {
    theme: Theme;
    selected: boolean;
}

export const StyledGeneralSelectorItem = styled.li<IStyledGeneralSelectorItem>`
    padding: 0.7rem 1.4rem;
    user-select: none;
    cursor: pointer;
    background-color: ${
        ({
            theme,
            selected,
        }: IStyledGeneralSelectorItem) => selected
            ? theme.backgroundColorPrimary
            : 'initial'
    };

    :hover {
        background-color: ${
            ({
                theme,
            }: IStyledGeneralSelectorItem) => theme.backgroundColorPrimary
        };
    }
`;


export interface IStyledGeneralSelected {
}

export const StyledGeneralSelected = styled.div<IStyledGeneralSelected>`
    padding: 2rem;
`;

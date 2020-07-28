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
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr;
    grid-template-rows: 100px auto 40px;

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

    li {
        cursor: pointer;
        padding: 0.7rem 1.4rem;
        user-select: none;
    }
`;


export interface IStyledGeneralSelectorItem {
    theme: Theme;
    selected: boolean;
}

export const StyledGeneralSelectorItem = styled.li<IStyledGeneralSelectorItem>`
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


export const StyledGeneralPeformer = styled.div`
    display: grid;
    place-content: center;
    grid-gap: 0.5rem;
    height: 100%;
    font-size: 0.9rem;
    text-align: center;
    user-select: none;
`;

export const StyledGeneralHelp = styled.div`
    li {
        font-size: 0.9rem;
    }
`;


export const StyledGeneralHelpItem = styled.li`
    display: grid;
    align-items: center;
    grid-template-columns: auto 30px;
`;

export const StyledGeneralHelpItemIcon = styled.div`
    display: grid;
    justify-items: right;
`;

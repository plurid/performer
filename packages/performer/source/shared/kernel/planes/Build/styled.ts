import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export const StyledBuild = styled.div`
    font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Open Sans', 'Helvetica Neue', sans-serif;

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
    grid-template-rows: 100px auto;

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

    display: grid;
    grid-template-columns: 16px auto;
    grid-gap: 0.7rem;
    min-height: 42px;
    align-items: center;
`;


export const StyledGeneralSelectorIcon = styled.div`

`;


export const StyledBuildTitle = styled.div`
    display: grid;
    place-content: center;
`;


export const StyledBuildLog = styled.div`
    padding: 2rem;
`;


export const StyledBuildLogData = styled.div`
    white-space: pre-line;
    font-family: 'Inconsolata', 'Courier New', Courier, monospace;
    line-height: 1.3;
    padding: 2rem;
    max-height: 470px;
    overflow: auto;
    margin: -2rem;
    margin-bottom: 0;
`;

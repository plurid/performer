// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export const StyledBuild = styled.div`
    font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Open Sans', 'Helvetica Neue', sans-serif;

    display: grid;
    grid-template-columns: 1fr 4fr;
    min-height: 700px;
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
    white-space: pre;
    max-width: 75vw;
    font-family: 'Source Code Pro', 'Courier New', Courier, monospace;
    line-height: 1.4;
    max-height: calc(700px - 4rem);
    min-height: calc(700px - 4rem);
    overflow: auto;
`;
// #endregion module

// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledDeployer {
    theme: Theme;
}

export const StyledDeployer = styled.div<IStyledDeployer>`
    display: grid;
    place-content: center;
    text-align: center;
    min-height: 700px;
`;
// #endregion module

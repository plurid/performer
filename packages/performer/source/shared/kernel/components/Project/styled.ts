// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



export interface IStyledProject {
    theme: Theme;
}

export const StyledProject = styled.div<IStyledProject>`
    display: grid;
    place-content: center;
    text-align: center;
    min-height: 700px;
`;

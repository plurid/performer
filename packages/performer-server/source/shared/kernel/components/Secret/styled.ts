// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



export interface IStyledSecret {
    theme: Theme;
}

export const StyledSecret = styled.div<IStyledSecret>`
    display: grid;
    place-content: center;
    text-align: center;
    min-height: 700px;
`;

// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledWebhook {
    theme: Theme;
}

export const StyledWebhook = styled.div<IStyledWebhook>`
    display: grid;
    place-content: center;
    text-align: center;
    min-height: 700px;
`;
// #endregion module

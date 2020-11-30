// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        universal,
    } from '@plurid/plurid-ui-components-react';
    // #endregion libraries
// #endregion imports



// #region module
const {
    buttons: {
        PureButton: PluridPureButton,
        LinkButton: PluridLinkButton,
    },
    inputs: {
        Textline: PluridTextline,
        InputLine: PluridInputLine,
    },
} = universal;


export {
    PluridInputLine,
};


export const StyledPluridTextline = styled(PluridTextline)`
    margin: 20px auto;
    width: 350px;
`;


export const StyledPluridPureButton = styled(PluridPureButton)`
    margin: 20px auto;
    margin-top: 40px;
    width: 250px;
`;


export const StyledPluridLinkButton = styled(PluridLinkButton)`
    display: grid;
    place-content: center;
    margin: 30px auto;
`;
// #endregion module

import styled from 'styled-components';

import {
    PluridPureButton,
    PluridTextline,
} from '@plurid/plurid-ui-react';



export interface IStyledSetupView {
}

export const StyledSetupView = styled.div<IStyledSetupView>`
    min-height: 500px;
    display: grid;
    place-content: center;
`;



export const StyledPluridTextline = styled(PluridTextline)`
    margin: 20px auto;
    width: 350px;
`;


export const StyledPluridPureButton = styled(PluridPureButton)`
    margin: 20px auto;
    width: 250px;
`;

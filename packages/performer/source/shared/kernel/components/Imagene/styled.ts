import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledImagene {
    theme: Theme;
}

export const StyledImagene = styled.div<IStyledImagene>`
    display: grid;
    place-content: center;
    text-align: center;
    min-height: 700px;
`;

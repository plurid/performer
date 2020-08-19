import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledTrigger {
    theme: Theme;
}

export const StyledTrigger = styled.div<IStyledTrigger>`
    display: grid;
    place-content: center;
    text-align: center;
    min-height: 700px;
`;

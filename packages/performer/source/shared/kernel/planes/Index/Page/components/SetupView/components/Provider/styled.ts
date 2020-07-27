import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledProvider {
    theme: Theme;
}

export const StyledProvider = styled.div<IStyledProvider>`
`;

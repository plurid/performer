import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledProviderIcon {
    theme: Theme;
}

export const StyledProviderIcon = styled.div<IStyledProviderIcon>`
    display: grid;
    place-content: center;
`;

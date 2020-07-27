import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledProviderSelector {
    theme: Theme;
}

export const StyledProviderSelector = styled.div<IStyledProviderSelector>`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledProvidersView {
    theme: Theme;
}

export const StyledProvidersView = styled.div<IStyledProvidersView>`
`;

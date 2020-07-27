import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledRepositoryItem {
    theme: Theme;
}

export const StyledRepositoryItem = styled.div<IStyledRepositoryItem>`
`;

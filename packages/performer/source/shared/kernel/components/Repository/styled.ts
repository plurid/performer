import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledRepository {
    theme: Theme;
}

export const StyledRepository = styled.div<IStyledRepository>`
`;

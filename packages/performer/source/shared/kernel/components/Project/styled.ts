import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledProject {
    theme: Theme;
}

export const StyledProject = styled.div<IStyledProject>`
    display: grid;
    place-content: center;
    text-align: center;
    min-height: 500px;
`;

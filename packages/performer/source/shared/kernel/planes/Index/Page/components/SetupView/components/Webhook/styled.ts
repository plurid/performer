import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledWebhook {
    theme: Theme;
}

export const StyledWebhook = styled.div<IStyledWebhook>`
`;

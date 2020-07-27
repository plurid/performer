import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledRepository {
    theme: Theme;
}

export const StyledRepository = styled.div<IStyledRepository>`
    ul {
        text-align: left;
        padding: 0;
        margin: 20px 0;
        background-color: ${
            ({
                theme,
            }: IStyledRepository) => theme.backgroundColorSecondaryAlpha
        }
    }
`;

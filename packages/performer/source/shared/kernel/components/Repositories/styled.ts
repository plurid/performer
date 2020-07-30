import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledRepository {
    theme: Theme;
}

export const StyledRepository = styled.div<IStyledRepository>`
    position: relative;
    display: grid;
    place-content: center;
    text-align: center;
    min-height: 500px;

    ul {
        text-align: left;
        padding: 0;
        margin: 50px 0;
        max-height: 500px;
        min-width: 400px;
        overflow: auto;
        background-color: ${
            ({
                theme,
            }: IStyledRepository) => theme.backgroundColorSecondaryAlpha
        };
        box-shadow: ${
            ({
                theme,
            }: IStyledRepository) => theme.boxShadowUmbraInset
        };
    }
`;


export const StyledNoRepositories = styled.div`
    margin: 30px;
    text-align: center;
`;

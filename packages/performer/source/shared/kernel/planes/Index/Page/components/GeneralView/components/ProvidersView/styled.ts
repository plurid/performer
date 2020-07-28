import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledProvidersView {
    theme: Theme;
}

export const StyledProvidersView = styled.div<IStyledProvidersView>`
    position: relative;
    height: 100%;
`;


export const StyledProvidersList = styled.div`
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
`;

export const StyledProvidersListItem = styled.li`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 0.7rem;
`;


export const StyledProvidersButton = styled.div`
    width: 200px;
    position: absolute;
    bottom: 0;
    right: 0;
`;

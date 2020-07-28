import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledRepositoriesView {
    theme: Theme;
}

export const StyledRepositoriesView = styled.div<IStyledRepositoriesView>`
    position: relative;
    height: 100%;
`;


export const StyledRepositoriesList = styled.div`
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
`;

export const StyledRepositoriesListItem = styled.li`
    display: grid;
    grid-template-columns: 4fr 30px;
    padding: 0.7rem;
    align-items: center;
`;


export const StyledRepositoriesButton = styled.div`
    width: 200px;
    position: absolute;
    bottom: 0;
    right: 0;
`;

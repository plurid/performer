import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledEntityView {
    theme: Theme;
}

export const StyledEntityView = styled.div<IStyledEntityView>`
    position: relative;
    height: 100%;
`;


export const StyledEntityList = styled.div`
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
`;


export interface IStyledEntityListItem {
    rowTemplate: string;
}

export const StyledEntityListItem = styled.li<IStyledEntityListItem>`
    display: grid;
    grid-template-columns: ${
        ({
            rowTemplate,
        }: IStyledEntityListItem) => rowTemplate
    };
    padding: 0.7rem;
    align-items: center;
`;


export const StyledActionButton = styled.div`
    width: 200px;
    position: absolute;
    bottom: 0;
    right: 0;
`;

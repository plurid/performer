/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import githubLogo from '../../../../../../assets/github-logo.png';
import bitbucketLogo from '../../../../../../assets/bitbucket-logo.png';


/** internal */
import ProviderIcon from './components/ProviderIcon';

import {
    StyledProviderSelector,
} from './styled';
/** [END] imports */



/** [START] component */
export interface ProviderSelectorProperties {
    /** required */
    /** - values */
    theme: Theme;
    selectedProvider: string;
    /** - methods */
    setSelecterProvider: React.Dispatch<React.SetStateAction<string>>;

    /** optional */
    /** - values */
    /** - methods */
}

const ProviderSelector: React.FC<ProviderSelectorProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        selectedProvider,
        /** - methods */
        setSelecterProvider,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <StyledProviderSelector
            theme={theme}
        >
            <ProviderIcon
                theme={theme}
                type="github"
                image={githubLogo}
                name="GitHub"
                selectedProvider={selectedProvider}
                setSelecterProvider={setSelecterProvider}
            />

            <ProviderIcon
                theme={theme}
                type="bitbucket"
                image={bitbucketLogo}
                name="BitBucket"
                selectedProvider={selectedProvider}
                setSelecterProvider={setSelecterProvider}
            />
        </StyledProviderSelector>
    );
}


export default ProviderSelector;
/** [END] component */

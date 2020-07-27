/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */


/** internal */
import githubLogo from './assets/github-logo.png';
import bitbucketLogo from './assets/bitbucket-logo.png';

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
    setSelectedProvider: React.Dispatch<React.SetStateAction<string>>;

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
        setSelectedProvider,

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
                setSelectedProvider={setSelectedProvider}
            />

            <ProviderIcon
                theme={theme}
                type="bitbucket"
                image={bitbucketLogo}
                name="BitBucket"
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
            />
        </StyledProviderSelector>
    );
}


export default ProviderSelector;
/** [END] component */

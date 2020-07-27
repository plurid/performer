/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import githubLogo from '#kernel-planes/Index/Page/assets/github-logo.png';
import bitbucketLogo from '#kernel-planes/Index/Page/assets/bitbucket-logo.png';


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
                image={githubLogo}
                name="GitHub"
            />

            <ProviderIcon
                theme={theme}
                image={bitbucketLogo}
                name="BitBucket"
            />
        </StyledProviderSelector>
    );
}


export default ProviderSelector;
/** [END] component */

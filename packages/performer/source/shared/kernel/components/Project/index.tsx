/** [START] imports */
/** libraries */
import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import client from '#kernel-services/graphql/client';
import {
    GENERATE_PROJECT,
} from '#kernel-services/graphql/mutate';

import {
    StyledPluridTextline,
    StyledPluridPureButton,
    StyledPluridLinkButton,
} from '#kernel-services/styled';


/** internal */
import {
    StyledProject,
} from './styled';
/** [END] imports */



/** [START] component */
export interface ProjectProperties {
    /** required */
    /** - values */
    theme: Theme;
    /** - methods */
    action: () => void;

    /** optional */
    /** - values */
    /** - methods */
    cancel?: () => void;
}

const Project: React.FC<ProjectProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        /** - methods */
        action,

        /** optional */
        /** - values */
        /** - methods */
        cancel,
    } = properties;


    /** state */
    const [
        projectName,
        setProjectName,
    ] = useState('');


    /** handle */
    const setProject = async () => {
        if (!projectName) {
            return;
        }

        const input = {
            value: projectName,
        };

        await client.mutate({
            mutation: GENERATE_PROJECT,
            variables: {
                input,
            },
        });
    }


    /** render */
    return (
        <StyledProject
            theme={theme}
        >
            <div>
                <h1>
                    add project
                </h1>

                <div>
                    <StyledPluridTextline
                        text={projectName}
                        placeholder="name"
                        atChange={(event) => setProjectName(event.target.value)}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        theme={theme}
                        level={2}
                    />
                </div>

                <div>
                    <StyledPluridPureButton
                        text="Add Project"
                        atClick={() => {
                            action();
                            setProject();
                        }}
                        level={2}
                        disabled={!projectName}
                    />
                </div>

                {cancel && (
                    <div>
                        <StyledPluridLinkButton
                            text="cancel"
                            atClick={() => cancel()}
                            theme={theme}
                            level={2}
                        />
                    </div>
                )}
            </div>
        </StyledProject>
    );
}


export default Project;
/** [END] component */

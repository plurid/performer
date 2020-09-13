// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        StyledPluridTextline,
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '#kernel-services/styled';
    // #endregion external


    // #region internal
    import {
        StyledNotifier,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface NotifierProperties {
    // #region required
        // #region values
        theme: Theme;
        providerID: string;
        // #endregion values

        // #region methods
        action: () => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        cancel?: () => void;
        // #endregion methods
    // #endregion optional
}

const Notifier: React.FC<NotifierProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme,
            providerID,
            // #endregion values

            // #region methods
            action,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            cancel,
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region state
    const [
        notifierName,
        setNotifierName,
    ] = useState('');
    // #endregion state


    // #region handlers
    const addNotifier = async () => {
        if (!notifierName) {
            return;
        }

        // const input = {
        //     value: notifierName,
        // };

        // const mutation = await client.mutate({
        //     mutation: ADD_Notifier,
        //     variables: {
        //         input,
        //     },
        // });
        // console.log('mutation', mutation);
    }
    // #endregion handlers


    // #region render
    return (
        <StyledNotifier
            theme={theme}
        >
            <div>
                <h1>
                    add Notifier
                </h1>

                <div>
                    <StyledPluridTextline
                        text={notifierName}
                        placeholder="name"
                        atChange={(event) => setNotifierName(event.target.value)}
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
                        text="Add Notifier"
                        atClick={() => {
                            action();
                            addNotifier();
                        }}
                        level={2}
                        disabled={!notifierName}
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
        </StyledNotifier>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Notifier;
// #endregion exports

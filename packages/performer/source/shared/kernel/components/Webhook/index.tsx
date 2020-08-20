// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        graphql,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Webhook as IWebhook,
    } from '#server/data/interfaces';

    import client from '#kernel-services/graphql/client';
    import {
        SETUP_WEBHOOK,
    } from '#kernel-services/graphql/mutate';

    import {
        StyledPluridTextline,
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '#kernel-services/styled';
    // #endregion external


    // #region internal
    import {
        StyledWebhook,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface WebhookProperties {
    // #region required
        // #region values
        theme: Theme;
        providerID: string;
        // #endregion values

        // #region methods
        action: (
            webhook: IWebhook,
        ) => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        editID?: string;
        // #endregion values

        // #region methods
        cancel?: () => void;
        // #endregion methods
    // #endregion optional
}

const Webhook: React.FC<WebhookProperties> = (
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
            editID,
            // #endregion values

            // #region methods
            cancel,
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region state
    const [
        webhookPath,
        setWebhookPath,
    ] = useState('');
    // #endregion state


    // #region handlers
    const updateWebhook = async () => {
    }

    const setWebhook = async () => {
        if (!webhookPath || !providerID) {
            return;
        }

        if (editID) {
            await updateWebhook();
            return;
        }

        try {
            const input = {
                providerID,
                path: webhookPath,
            };

            const mutation = await client.mutate({
                mutation: SETUP_WEBHOOK,
                variables: {
                    input,
                },
            });

            const reponse = mutation.data.setupWebhook;

            if (!reponse.status) {
                return;
            }

            const {
                data,
            } = reponse;

            return graphql.deleteTypenames(data);
        } catch (error) {
            return;
        }
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        if (editID) {
            // get webhook data
            // and setWebhookPath
        }
    }, [
        editID,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledWebhook
            theme={theme}
        >
            <div>
                <h1>
                    {editID ? 'update' : 'setup'} webhook
                </h1>

                <div>
                    <StyledPluridTextline
                        text={webhookPath}
                        placeholder="/path/to/webhook"
                        atChange={(event) => setWebhookPath(event.target.value)}
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
                        text={editID ? 'Update Webhook' : 'Setup Webhook'}
                        atClick={async () => {
                            const webhook = await setWebhook();
                            if (webhook) {
                                action(webhook);
                            }
                        }}
                        level={2}
                        disabled={!webhookPath}
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
        </StyledWebhook>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Webhook;
// #endregion exports

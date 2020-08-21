// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        Webhook as IWebhook,
    } from '#server/data/interfaces';

    import {
        SETUP_WEBHOOK,
    } from '#kernel-services/graphql/mutate';

    import {
        addEntityMutation,
    } from '#kernel-services/logic/mutations';

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
        findEntityByID?: (
            entity: string,
            id: string,
        ) => any;
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
            findEntityByID,
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

    const setupWebhook = async () => {
        if (!webhookPath || !providerID) {
            return;
        }

        if (editID) {
            await updateWebhook();
            return;
        }

        const webhook: IWebhook | undefined = await addEntityMutation(
            {
                providerID,
                path: webhookPath,
            },
            SETUP_WEBHOOK,
            'setupWebhook',
        );

        if (webhook) {
            action(webhook);
        }
    }

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            setupWebhook();
        }
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const getWebhook = async (
            editID: string,
        ) => {
            if (!findEntityByID) {
                return;
            }

            const webhook: IWebhook | undefined = await findEntityByID(
                'webhook',
                editID,
            );

            if (!webhook) {
                return;
            }

            setWebhookPath(webhook.path);
        }

        if (editID) {
            getWebhook(editID);
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
                        atKeyDown={(event) => handleEnter(event)}
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
                        atClick={() => setupWebhook()}
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

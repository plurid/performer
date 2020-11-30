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
        UPDATE_WEBHOOK,
        SETUP_WEBHOOK,
    } from '@plurid/performer-requests';
    // #endregion libraries


    // #region external
    import {
        Webhook as IWebhook,
    } from '#server/data/interfaces';

    import {
        addEntityMutation,
    } from '#kernel-services/logic/mutations';

    import {
        PluridInputLine,
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
    const [
        validWebhookPath,
        setValidWebhookPath,
    ] = useState(false);
    // #endregion state


    // #region handlers
    const updateWebhook = async () => {
        if (!findEntityByID || !editID) {
            return;
        }

        const webhook: IWebhook | undefined = await findEntityByID(
            'webhook',
            editID,
        );

        if (!webhook) {
            return;
        }

        const updatedWebhook: IWebhook = {
            ...webhook,
            path: webhookPath,
        };

        await addEntityMutation(
            {
                id: updatedWebhook.id,
                providerID,
                path: updatedWebhook.path,
            },
            UPDATE_WEBHOOK,
            'updateWebhook',
        );

        action(updatedWebhook);
    }

    const setupWebhook = async () => {
        if (!validWebhookPath || !providerID) {
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
    /** Handle edit mode */
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

    /** Check webhook path validity */
    useEffect(() => {
        if (!webhookPath) {
            setValidWebhookPath(false);
            return;
        }

        if (!webhookPath.startsWith('/')) {
            setValidWebhookPath(false);
            return;
        }

        if (webhookPath === '/') {
            setValidWebhookPath(false);
            return;
        }

        setValidWebhookPath(true);
    }, [
        webhookPath,
    ])
    // #endregion effects


    // #region render
    return (
        <StyledWebhook
            theme={theme}
        >
            <h1>
                {editID ? 'update' : 'setup'} webhook
            </h1>

            <div>
                <PluridInputLine
                    text={webhookPath}
                    name="/path/to/webhook"
                    atChange={(event) => setWebhookPath(event.target.value)}
                    atKeyDown={handleEnter}
                    theme={theme}
                />
            </div>

            <StyledPluridPureButton
                text={editID ? 'Update Webhook' : 'Setup Webhook'}
                atClick={() => setupWebhook()}
                level={2}
                disabled={!validWebhookPath}
            />

            {cancel && (
                <StyledPluridLinkButton
                    text="cancel"
                    atClick={() => cancel()}
                    theme={theme}
                    level={2}
                />
            )}
        </StyledWebhook>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Webhook;
// #endregion exports

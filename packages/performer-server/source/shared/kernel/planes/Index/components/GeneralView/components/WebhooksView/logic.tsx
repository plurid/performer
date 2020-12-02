// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconEdit,
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        Webhook,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const webhookRowRenderer = (
    webhook: Webhook,
    handleWebhookEdit: (
        id: string,
    ) => void,
    handleWebhookObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        path,
        provider,
    } = webhook;

    return (
        <>
            <div>
                {path}
            </div>

            <div>
                {provider}
            </div>

            <PluridIconEdit
                atClick={() => handleWebhookEdit(id)}
            />

            <PluridIconDelete
                atClick={() => handleWebhookObliterate(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    webhooks: Webhook[],
) => {
    const searchTerms = webhooks.map(
        webhook => {
            const {
                id,
                path,
                provider,
            } = webhook;

            const searchTerm = {
                id,
                data: [
                    path.toLowerCase(),
                    provider.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module

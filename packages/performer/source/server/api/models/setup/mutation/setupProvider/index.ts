// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Context,
        Provider,
        CodeProvider,
    } from '#server/data/interfaces';

    import {
        providersPath,
    } from '#server/data/constants';
    // #endregion external
// #endregion imports



// #region module
const registerProvider = async (
    type: CodeProvider,
    token: string,
    name: string,
) => {
    const id = uuid.generate();

    const provider: Provider = {
        id,
        type,
        token,
        name,
    };

    const providerPath = path.join(
        providersPath,
        id + '.json',
    );

    await fs.writeFile(
        providerPath,
        JSON.stringify(provider, null, 4),
    );

    return provider;
}


const setupProvider = async (
    input: any,
    context: Context,
) => {
    const {
        type,
        token,
        name
    } = input;

    const provider = await registerProvider(
        type,
        token,
        name,
    );

    return {
        status: true,
        data: provider.id,
    };
}
// #endregion module



// #region exports
export default setupProvider;
// #endregion exports

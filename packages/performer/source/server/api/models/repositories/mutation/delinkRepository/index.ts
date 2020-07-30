import {
    Context,
} from '#server/data/interfaces';




const deregisterRepository = async (
    id: string,
) => {
    try {

        // if (!fs.existsSync(repositoryPath)) {
        //     return;
        // }

    } catch (error) {
        return;
    }
}


const delinkRepository = async (
    input: any,
    context: Context,
) => {
    const {
        value,
    } = input;

    await deregisterRepository(value);

    return {
        status: true,
    };
}


export default delinkRepository;

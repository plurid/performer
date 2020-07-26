// export interface GraphQLRoot {

// }

// export interface GraphQLArgsInputOf {

// }



export default {
    // a: (
    //     _: GraphQLRoot,
    //     { input }: GraphQLArgsInputOf<any>,
    //     context: Context,
    // ) => b(
    //     input,
    //     context,
    // ),
    setupWebhook: (
        _: any,
        { input }: any,
        context: any,
    ) => {
        return {
            status: true,
        };
    },
}

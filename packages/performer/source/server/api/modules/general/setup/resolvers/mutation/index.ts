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
    initialSetup: (
        _: any,
        { input }: any,
        context: any,
    ) => {
        return {
            status: true,
        };
    },
}

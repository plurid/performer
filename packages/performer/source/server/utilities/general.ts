import express from 'express';



export const cleanFileName = (
    name: string,
) => {
    return name.replace(/\//, '-');
}



export const getRoutes = (
    instance: express.Express,
) => {
    const routes = instance._router.stack           // registered routes
                    .filter((r: any) => r.route)    // take out all the middleware
                    .map((r: any) => r.route.path)  // get all the paths

    return routes;
}


export const compareValues = <T>(
    key: string,
    order = 'asc',
) => {
    return (
        a: T,
        b: T,
    ) => {
        if (!(a as any).hasOwnProperty(key) || !(b as any).hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase()
            : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase()
            : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }

        return (
            (order === 'desc')
                ? (comparison * -1)
                : comparison
        );
    };
}

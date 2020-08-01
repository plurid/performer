import ncp from 'ncp';



export const copyDirectory = async (
    source: string,
    destination: string,
) => {
    return new Promise((resolve, reject) => {
        ncp(source, destination, (error) => {
            if (error) {
                reject(0);
            }

            resolve();
        });
    });
}

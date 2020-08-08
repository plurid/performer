import fs from 'fs';



export const makeDirectorySync = (
    directory: string,
) => {
    fs.mkdirSync(directory, {
        recursive: true,
    });
}

// #region imports
    // #region libraries
    import nodemailer from 'nodemailer';
    // #endregion libraries


    // #region external
    import {
        NotifierEmailAuthentication,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const notify = async (
    data: NotifierEmailAuthentication,
    to: string,
    subject: string,
    message: string,
) => {
    const {
        host,
        port,
        secure,
        username,
        password,
        sender,
    } = data;

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user: username,
            pass: password,
        },
    });

    const info = await transporter.sendMail({
        from: sender,
        to,
        subject,
        text: message,
        html: message,
    });

    return info.messageId;
}
// #endregion module



// #region exports
export {
    notify,
};
// #endregion exports

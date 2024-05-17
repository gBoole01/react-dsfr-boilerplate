export default function isEmailValid(email: string) {
    const regExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regExp.test(email);
}

export default function isPhoneValid(number: string) {
    const regExp = /^0\d{9}$/;
    return regExp.test(number);
}

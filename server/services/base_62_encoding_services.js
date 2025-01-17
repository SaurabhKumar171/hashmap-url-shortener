export const encodeBase62 = (number) => {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let result = "";

    while(number > 0){
        let remainder = number % 62;
        result = chars[remainder] + result;
        number = Math.floor(number / 62);
    }

    return result || "0";
}
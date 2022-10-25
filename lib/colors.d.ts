declare interface Colors {
    [key: string]: String;
    clear: String;
    bold: String;
    inverse: String;
    black: String;
    red: String;
    green: String;
    yellow: String;
    blue: String;
    magenta: String;
    cyan: String;
    white: String;
    gray: String;
    grey: String;
    redBright: String;
    greenBright: String;
    yellowBright: String;
    blueBright: String;
    magentaBright: String;
    cyanBright: String;
    whiteBright: String;
    blackBg: String;
    redBg: String;
    greenBg: String;
    yellowBg: String;
    blueBg: String;
    magentaBg: String;
    cyanBg: String;
    whiteBg: String;
    greyBg: String;
    redBrightBg: String;
    greenBrightBg: String;
    yellowBrightBg: String;
    blueBrightBg: String;
    magentaBrightBg: String;
    cyanBrightBg: String;
    whiteBrightBg: String;
}
declare global {
    interface String extends Colors {
    }
}
declare const _default: Colors;
export = _default;

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.png' {
    const value: any;
    export = value;
}

declare module '*.svg' {
    const value: any;
    export = value;
}

declare module '*.jpg' {
    const value: any;
    export = value;
}

declare module '!!raw-loader!*' {
    const contents: string;
    export = contents;
}

interface Window {
    webkitSpeechRecognition: any;
}

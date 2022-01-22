/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/

declare global {
    interface Array<T> {
        mapFirst: <V>(selector: (element: T) => V) => V | undefined;
    }
}

if (!Array.prototype.mapFirst) {
    Array.prototype.mapFirst = function (selector) {
        for (const element of this) {
            const value = selector(element)
            if (value) {
                return value;
            } 
        }
    }
}

export {};
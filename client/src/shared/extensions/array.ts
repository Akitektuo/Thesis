/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/

declare global {
    interface Array<T> {
        mapFirst: <V>(selector: (element: T) => V) => V | undefined;
        update: <V>(newValue: T, selector: (element: T) => V) => V | null;
    }
}

if (!Array.prototype.mapFirst) {
    Array.prototype.mapFirst = function (selector) {
        for (const element of this) {
            const value = selector(element);
            if (value) {
                return value;
            } 
        }
    }
}

if (!Array.prototype.update) {
    Array.prototype.update = function (newValue, selector) {
        const updateIndex = this.findIndex(element => selector(element) === selector(newValue));
        const oldValue = this[updateIndex];
        
        this[updateIndex] = newValue;

        return oldValue;
    }
}

export {};
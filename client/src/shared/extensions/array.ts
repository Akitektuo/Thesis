/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/

import { ArrayGroup } from "shared/types";

declare global {
    interface Array<T> {
        mapFirst: <V>(selector: (element: T) => V) => V | undefined;
        update: <V>(newValue: T, selector: (element: T) => V) => V | null;
        sortBy: <V>(selector?: (element: T) => V, descending?: boolean) => Array<T>;
        groupBy: <V>(selector: (element: T) => V) => Array<ArrayGroup<T, V>>;
        joinBy: <V>(selector: (element: T) => V, separator?: string) => string;
        remove: <V>(selector: (element: T) => V) => V | null;
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

if (!Array.prototype.sortBy) {
    Array.prototype.sortBy = function (selector, descending) {
        return this.slice().sort((previousObject, nextObject) => {
            const previous = selector ? selector(previousObject) : previousObject;
            const next = selector ? selector(nextObject) : nextObject;

            if (previous < next) {
                return descending ? 1 : -1;
            }
            if (previous > next) {
                return descending ? -1 : 1;
            }
            return 0;
        });
    }
}

if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function (selector) {
        const result: any[] = [];

        this.forEach(element => {
            const selectorValue = selector(element);
            const existingGroup = result.find(({ key }) => key === selectorValue);

            if (existingGroup)
                existingGroup.elements.push(element);
            else
                result.push({
                    key: selectorValue,
                    elements: [element]
                });
        });

        return result;
    }
}

if (!Array.prototype.joinBy) {
    Array.prototype.joinBy = function (selector, separator = ", ") {
        return this.map(selector).join(separator);
    }
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function (selector) {
        const removeIndex = this.findIndex(element => selector(element));
        const oldValue = this[removeIndex];
        
        this.splice(removeIndex, 1);

        return oldValue;
    }
}

export {};
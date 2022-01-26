export const compare = (reference: any, value: any, contains?: boolean, ignoreCase?: boolean) => {
    let compareReference = reference;
    let compareValue = value;

    if (ignoreCase) {
        compareReference = reference?.toLowerCase();
        compareValue = value?.toLowerCase();
    }

    return contains ?
        compareReference?.includes(compareValue) :
        compareReference === compareValue;
}
export const computeProgress = (minimum: number, value: number, maximum: number) =>
    (value - minimum) * 100 / (maximum - minimum);
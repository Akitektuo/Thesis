export type InputNumber = number | null;

export type ArrayGroup<T, V> = { key: V, elements: T[] };

export interface IdWithPosition {
    id: string;
    position: number;
}
let idIndex: number = 0;

export function uniqueID(prefix) {
    return `${prefix}_${idIndex++}`;
}

// Unique id for a dropzone, format: "name_index"
export type DropZoneId = string;

export function dropZoneID(name: string, index: number): DropZoneId {
    const id = index + 1;
    return name + "_" + id;
}

export function dropZoneIndex(id: DropZoneId): number {
    return parseInt(id.split("_")[1]) - 1;
}
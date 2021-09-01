export interface BoardItemData {
	id: number | string;
	name: string;
}

export interface BoardColumnData {
	id: string;
	name: string;
	items: BoardItemData[];
}

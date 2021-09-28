export interface SIGResponse {
	num: SigNum;
	results: SIGResult[];
	pagebar: SIGPagebar;
	numName: string;
	numNameShort: string;
	translations: SIGTranslations;
}

export interface SIGTranslations {
	abschluss: string;
	studiengebuehren: string;
	kurssprache: string;
	zulassungssemester: string;
	keinergebnis: string;
}

export interface SIGPagebar {
	page: number;
	epp: number;
	num: number;
}

export interface SIGResult {
	uniqueId: string;
	id: string;
	typ: string;
	name: string;
	orderName: string;
	hsname: string;
	standort: string;
	hsStandort: string;
	abschlussart: SIGDegreeType;
	studienentgeltBetrag: string;
	studienentgeltEinheit: string;
	studienentgeltBemerkung: string;
	studienentgeltLink: string;
	zulassungssemester: string;
	hauptsprache: string;
	studienEntgeltNone?: string;
	studienentgeltHinweis: string;
	linkid: string;
	waehrung?: string;
}

export enum SIGDegreeType {
  bachelor = 'Bachelor',
  master = 'Master'
}

export interface SigNum {
	num: string;
	numName: string;
	numNameShort: string;
}
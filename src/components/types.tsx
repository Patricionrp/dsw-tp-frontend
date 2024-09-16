export interface Topic {
    id?: number;
    description?: string;
    courses?: number[]; 
}
export interface Level {
    id?: number;
    name?: string;
    course?: number;
    unities?: number[];
}
export interface File {
    nameFile?: string;
    typeFile?: string;
    unity?: number;
    level?: number;
    course?: number;
}
export interface Unity {
    id?: number;
    name?: string;
    level: number;
    number?: number;
    files?: number[]; 
}
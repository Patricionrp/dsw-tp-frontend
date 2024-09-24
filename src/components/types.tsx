
export interface Topic {
    id?: number;
    description: string;
    courses?: number[]; 
}
export interface Level {
    id?: number;
    name?: string;
    course?: number|Course;
    units?: number[];
}
export interface File {
    id?: number;
    nameFile: string;
    typeFile?: string;
    unit?: number;
}
export interface Unit {
    id?: number;
    name?: string;
    level: number;
    number?: number;
    files?: number[]; 
}
export interface Course {
    id?: number;
    title: string;
    createAt: Date;
    price: number;
    coursePurchaseRecords?: number[];
    topics?: number[] | Topic[];
    levels?: number[] | Level[];
}
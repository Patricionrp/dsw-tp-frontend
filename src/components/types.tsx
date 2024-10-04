export interface Topic {
  id?: number;
  description: string;
  courses?: number[] | Course[];
}
export interface Level {
  id?: number;
  order?: number;
  name?: string;
  description?: string;
  course?: number | Course;
  units?: number[]|Unit[];
}
export interface File {
  id?: number;
  nameFile: string;
  typeFile?: string;
  unit?: number|Unit;
}
export interface Unit {
  id?: number;
  order?: number;
  name?: string;
  level: number | Level;
  files?: number[];
}
export interface Course {
  id?: number;
  title: string;
  createAt?: Date;
  price: number;
  coursePurchaseRecords?: number[];
  topics?: number[] | Topic[];
  levels?: number[] | Level[];
}

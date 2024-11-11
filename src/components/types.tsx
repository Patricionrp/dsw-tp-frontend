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
  units?: Unit[] 
}
export interface File {
  id?: number;
  nameFile: string;
  typeFile?: string;
  unit?: number | Unit;
}
export interface Unit {
  id?: number;
  order?: number;
  name?: string;
  level?: number | Level;
  content: string;
  files?: number[];
}
export interface Course {
  id?: number;
  isActive?: boolean;
  title: string;
  createAt?: Date;
  price: number;
  coursePurchaseRecords?: number[] | CoursePurchaseRecord[];
  topics: number[] | Topic[];
  levels?: number[] | Level[];
}
export interface Subscription {
  id?: number;
  isActive?: boolean;
  description: string;
  duration: number;
  price: number;
  subsPurchaseRecords?: number[] | SubsPurchaseRecord[];
}
export interface PurchaseRecord {
  id?: number;
  totalAmount: number;
  purchaseAt?: Date;
  member: number;
}
export interface CoursePurchaseRecord extends PurchaseRecord {
  id?: number;
  totalAmount: number;
  purchaseAt?: Date;
  course: number | Course;
  member: number;
}
export interface SubsPurchaseRecord extends PurchaseRecord {
  id?: number;
  totalAmount: number;
  purchaseAt?: Date;
  subscription: number | Subscription;
  member: number;
}
export interface User {
  id?: number;
  dni?: string;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  admin?: boolean;
  purchaseRecords?: number[] | PurchaseRecord[];
}

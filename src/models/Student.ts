import { IStudent } from "./IStudent";

export class Student implements IStudent{

    id: number;
    firstName: string;
    lastName: string;
    dob: string;
    college: string;
    major: string;
    credits: number;
    gpa: number;

}
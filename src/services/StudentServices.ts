import { IStudent } from "../models/IStudent";
import { Student } from "../models/Student";
import { exception } from "console";
import mysql from "mysql";
import { rejects } from "assert";

export class StudentServices {

    private conn: mysql.Connection;

    constructor() {
        this.conn = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : 'Password',
            database : 'student_db'
        }).on('error', err => {
            console.log(`DB connection error: ${err.message}`);
        });
    }

    public getStudents(numRows?: number): Promise<IStudent[]> {

        numRows = numRows ? numRows : 50;
        return new Promise( ( resolve, reject ) => {

            const sql = 'SELECT * FROM students LIMIT ' + numRows;
            let students : IStudent[] = [];

            this.conn.connect( (err) => {
                if(err) {
                    reject(err);
                }
                this.conn.query(sql, (err, rows, fields) => {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }

                    rows.forEach((row:any) => {
                        students.push({
                            id: row.studentID,
                            firstName: row.FirstName,
                            lastName: row.LastName,
                            dob: row.DOB,
                            college: row.College,
                            major: row.Major,
                            credits: row.Credits,
                            gpa: row.GPA
                        } as IStudent);
                    });

                    this.conn.end();
                    resolve(students);
                });
            });
        } );
    }

    public searchStudents(column: string, value: string, numRows?: number): Promise<IStudent[]> {
        
        numRows = numRows ? numRows : 50;
        return new Promise( (resolve, reject) => {
            let sql = ""

            if(typeof(value) == "string") {
                if(isNaN(parseInt(value))){
                    sql = "SELECT * FROM students WHERE " + column + " = '" + value + "' LIMIT " + numRows;
                } else {
                    sql = "SELECT * FROM students WHERE " + column + " = " + value + " LIMIT " + numRows;
                }
            }else
                reject("Invalid Value");
            
            let students : IStudent[] = [];
            console.log(sql);

            this.conn.connect( (err) => {
                if(err) {
                    reject(err);
                }
                this.conn.query(sql, (err, rows, fields) => {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }

                    rows.forEach((row:any) => {
                        students.push({
                            id: row.studentID,
                            firstName: row.FirstName,
                            lastName: row.LastName,
                            dob: row.DOB,
                            college: row.College,
                            major: row.Major,
                            credits: row.Credits,
                            gpa: row.GPA
                        } as IStudent);
                    });

                    this.conn.end();
                    resolve(students);
                });
            });

        });
    }

    public getStudent(id: string): Promise<IStudent> {

        return new Promise( (resolve, reject) => {
            const sql = "SELECT * FROM students WHERE studentID = " + id;
            let student : IStudent;
            console.log(sql);

            try {
                parseInt(id);
            } catch (ex) {
                reject("Not Found");
            }
            this.conn.connect( (err) => {
                if(err) {
                    reject(err);
                }
                this.conn.query(sql, (err, rows, fields) => {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }

                    console.log(rows);
                    if(rows.length == 1)
                        student = {
                            id: rows[0].studentID,
                            firstName: rows[0].FirstName,
                            lastName: rows[0].LastName,
                            dob: rows[0].DOB,
                            college: rows[0].College,
                            major: rows[0].Major,
                            credits: rows[0].Credits,
                            gpa: rows[0].GPA
                        } as IStudent;

                    this.conn.end();
                    resolve(student);
                });
            });
        });
    }

}
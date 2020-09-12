"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const mysql_1 = __importDefault(require("mysql"));
class StudentServices {
    constructor() {
        this.conn = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Password',
            database: 'student_db'
        }).on('error', err => {
            console.log(`DB connection error: ${err.message}`);
        });
    }
    getStudents(numRows) {
        numRows = numRows ? numRows : 50;
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM students LIMIT ' + numRows;
            let students = [];
            this.conn.connect((err) => {
                if (err) {
                    reject(err);
                }
                this.conn.query(sql, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    rows.forEach((row) => {
                        students.push({
                            id: row.studentID,
                            firstName: row.FirstName,
                            lastName: row.LastName,
                            dob: row.DOB,
                            college: row.College,
                            major: row.Major,
                            credits: row.Credits,
                            gpa: row.GPA
                        });
                    });
                    this.conn.end();
                    resolve(students);
                });
            });
        });
    }
    searchStudents(column, value, numRows) {
        numRows = numRows ? numRows : 50;
        return new Promise((resolve, reject) => {
            let sql = "";
            if (typeof (value) == "string") {
                if (isNaN(parseInt(value))) {
                    sql = "SELECT * FROM students WHERE " + column + " = '" + value + "' LIMIT " + numRows;
                }
                else {
                    sql = "SELECT * FROM students WHERE " + column + " = " + value + " LIMIT " + numRows;
                }
            }
            else
                reject("Invalid Value");
            let students = [];
            console.log(sql);
            this.conn.connect((err) => {
                if (err) {
                    reject(err);
                }
                this.conn.query(sql, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    rows.forEach((row) => {
                        students.push({
                            id: row.studentID,
                            firstName: row.FirstName,
                            lastName: row.LastName,
                            dob: row.DOB,
                            college: row.College,
                            major: row.Major,
                            credits: row.Credits,
                            gpa: row.GPA
                        });
                    });
                    this.conn.end();
                    resolve(students);
                });
            });
        });
    }
    getStudent(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM students WHERE studentID = " + id;
            let student;
            console.log(sql);
            try {
                parseInt(id);
            }
            catch (ex) {
                reject("Not Found");
            }
            this.conn.connect((err) => {
                if (err) {
                    reject(err);
                }
                this.conn.query(sql, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    console.log(rows);
                    if (rows.length == 1)
                        student = {
                            id: rows[0].studentID,
                            firstName: rows[0].FirstName,
                            lastName: rows[0].LastName,
                            dob: rows[0].DOB,
                            college: rows[0].College,
                            major: rows[0].Major,
                            credits: rows[0].Credits,
                            gpa: rows[0].GPA
                        };
                    this.conn.end();
                    resolve(student);
                });
            });
        });
    }
}
exports.StudentServices = StudentServices;
//# sourceMappingURL=StudentServices.js.map
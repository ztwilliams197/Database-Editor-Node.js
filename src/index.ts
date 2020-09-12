import express, { json } from "express";
import {StudentServices} from "./services"
import {IStudent} from "./models";
import mysql from "mysql";

const app = express();
const port = 8080; // default port to listen

const studentServices: StudentServices = new StudentServices();

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.get( "/students", ( req, res ) => {
    studentServices.getStudents()
            .then((students) => res.send(students))
            .catch((ex) => {
                console.log(`Error while getting students: ${ex.message}`);
                res.sendStatus(500);
            });
} );

app.get( "/students/:id", ( req, res ) => {
    studentServices.getStudent(req.params.id)
            .then((student) => res.send(student))
            .catch((ex) => {
                console.log(`Error while getting student: ${ex.message}`);
                res.sendStatus(500);
            });
} );

app.get( "/students/column=:column/value=:value", (req, res) => {
    studentServices.searchStudents(req.params.column, req.params.value)
            .then((students) => res.send(students))
            .catch((ex) => {
                console.log(`Error while getting student: ${ex.message}`);
                res.sendStatus(500);
            });
});

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
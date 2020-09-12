"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = require("./services");
const app = express_1.default();
const port = 8080; // default port to listen
const studentServices = new services_1.StudentServices();
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.get("/students", (req, res) => {
    studentServices.getStudents()
        .then((students) => res.send(students))
        .catch((ex) => {
        console.log(`Error while getting students: ${ex.message}`);
        res.sendStatus(500);
    });
});
app.get("/students/:id", (req, res) => {
    studentServices.getStudent(req.params.id)
        .then((student) => res.send(student))
        .catch((ex) => {
        console.log(`Error while getting student: ${ex.message}`);
        res.sendStatus(500);
    });
});
app.get("/students/column=:column/value=:value", (req, res) => {
    studentServices.searchStudents(req.params.column, req.params.value)
        .then((students) => res.send(students))
        .catch((ex) => {
        console.log(`Error while getting student: ${ex.message}`);
        res.sendStatus(500);
    });
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
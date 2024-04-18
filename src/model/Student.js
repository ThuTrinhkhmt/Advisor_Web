import { Person } from './Person.js';
export class Student extends Person {
    #StudentID;

    constructor() {
        super();
        this.StudentID = null;
    }

    setStudentID(StudentID) {
        this.StudentID = StudentID;
    }

    getStudentID() {
        return this.StudentID;
    }

    display() {
        // Implement display method
    }

    ClassRegis(RegisClass) {
        
    }

    ViewPoint() {
        // Implement ViewPoint method
    }

    ViewClassList() {
        // Implement ViewClassList method
    }
}
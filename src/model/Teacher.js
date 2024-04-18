import { Person } from './Person.js';
export class Teacher extends Person {
    #specialize;
    #degree;
    #position;
    constructor(name, dateOfBirth, address, faculity, gender, specialize, degree, position) {
        super();
        this.specialize = null;
        this.degree = null;
        this.position = null;
    }

    setSpecialize(specialize) {
        this.specialize = specialize;
    }

    setDegree(degree) {
        this.degree = degree;
    }

    setPosition(position) {
        this.position = position;
    }

    getSpecialize() {
        return this.specialize;
    }

    getDegree() {
        return this.degree;
    }

    getPosition() {
        return this.position;
    }

    ViewPoint() {
        // Implement ViewPoint method
    }

    ViewClassList() {
        // Implement ViewClassList method
    }

    ViewStudentList() {
        // Implement ViewStudentList method
    }

    EditStudentPoint() {
        // Implement EditStudentPoint method
    }

    EditCourseDocument() {
        // Implement EditCourseDocument method
    }

    display() {
        // Implement display method
    }
}
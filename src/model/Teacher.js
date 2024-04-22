import { Person } from './Person.js';
export class Teacher extends Person {
    #specialize;
    #degree;
    #position;
    #groups = [];
    constructor(name, dateOfBirth, address, faculity, gender, id, specialize, degree, position) {
        super(name, dateOfBirth, address, faculity, gender, id);
        this.#specialize = specialize;
        this.#degree = degree;
        this.#position = position;
    }

    setSpecialize(specialize) {
        this.#specialize = specialize;
    }

    setDegree(degree) {
        this.#degree = degree;
    }

    setPosition(position) {
        this.#position = position;
    }

    getSpecialize() {
        return this.#specialize;
    }

    getDegree() {
        return this.#degree;
    }

    getPosition() {
        return this.#position;
    }

    getGroup(){

    }

    addGroup(course, groupName){

    }
    getAGroup(groupName){

    }
}
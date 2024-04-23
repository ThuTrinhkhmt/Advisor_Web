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
        return this.#groups;
    }

    addGroup(course, groupName){
        const courseGroups = course.getGroup();
        for (let group of courseGroups) {
            if (group.getName() === groupName) {
                this.groups.push(group);
            }
        }
    }
    getAGroup(groupName){
        for (let group of this.groups) {
            if (group.getGroupName() === groupName) {
                return group;
            }
        }
        return null;
    }
}
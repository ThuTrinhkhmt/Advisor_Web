import { Person } from './Person.js';
import { getTeaData } from '../firebase/firebasefunction';
export class Teacher extends Person {
    #specialize;
    #degree;
    #position;
    #groups = [];
    constructor(id) {
        super(id);
        this.loadFromDatabase();
    }

    async loadFromDatabase() {
        const userData = await getTeaData(super.getID());
        
        if (userData) {
            super.setName(userData.Name);
            super.setDateOfBirth(userData.DateOfBirth);
            super.setAddress(userData.Address);
            super.setFaculity(userData.Faculity);
            super.setGender(userData.Gender);
            this.#degree=userData.Degree;
            this.#position=userData.Position;
            this.#specialize=userData.Specialize;
        }
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
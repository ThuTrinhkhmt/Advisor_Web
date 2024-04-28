import { db, ref, set, get, child, update, remove } from '../firebase/firebase';
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
            await super.setName(userData.Name);
            await super.setDateOfBirth(userData.DateOfBirth);
            await super.setAddress(userData.Address);
            await super.setFaculity(userData.Faculity);
            await super.setGender(userData.Gender);
            this.#degree=userData.Degree;
            this.#position=userData.Position;
            this.#specialize=userData.Specialize;
        }
    }

    async setSpecialize(specialize) {
        this.#specialize = specialize;
        const userRef = ref(db, `Teacher/${super.getID()}`);
        try {
            await update(userRef, {
                Specialize: specialize
            });
            this.#specialize = specialize;
            console.log("User data updated successfully");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    async setDegree(degree) {
        const userRef = ref(db, `Teacher/${super.getID()}`);
        try {
            await update(userRef, {
                Degree: degree
            });
            this.#degree = degree;
            console.log("User data updated successfully");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    async setPosition(position) {
        const userRef = ref(db, `Teacher/${super.getID()}`);
        try {
            await update(userRef, {
                Position: position
            });
            this.#position = position;
            console.log("User data updated successfully");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
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
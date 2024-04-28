import { db, ref, set, get, child, update, remove } from '../firebase/firebase';
import { Person } from './Person.js';
import { getTeaData } from '../firebase/firebasefunction';
import { Course } from './Course.js';
import { Group } from './Group.js';
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
            const arrayCourse = Object.keys(userData.Course || {});
            for (const courseID of arrayCourse) {
                //Them group
                const Ref = ref(db, `Teacher/${super.getID()}/Course/${courseID}/Class`);
                const snapshot = await get(Ref);
                const arrayGroup = Object.keys(snapshot.val() || {});
                for (const groupID of arrayGroup) {
                    const groupData = new Group(courseID, groupID);
                    await groupData.loadFromDatabase();
                    this.#groups.push(groupData);
                }
                alert(this.#groups.length);
            }
        }
    }

    async setSpecialize(specialize) {
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

    async addGroup(course, groupName){
        const HasCourse = false;
        const nameCourse = course.getName();
        const courseGroups = course.getGroup();
        const userRef = ref(db, `Teacher/${super.getID()}/Course`);
        const arrayCourse = Object.keys(userRef || {});
        for (let courseData of arrayCourse) {
            if(courseData === nameCourse) {
                HasCourse = true;
                break;
            }
        }
        for (let group of courseGroups) {
            if (group.getName() === groupName) {
                const groupData = new Group(course.getName(), groupName);
                await groupData.loadFromDatabase();
                this.groups.push(groupData);
            }
        }
        if(HasCourse){
            try {
                await set(userRef, {
                    nameCourse: groupName
                });
                console.log("User data updated successfully");
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        }
    }
    getAGroup(groupName){
        for (let group of this.groups) {
            if (group.getName() === groupName) {
                return group;
            }
        }
        return null;
    }
}
import { Person } from './Person.js';
import { getStuData } from '../firebase/firebasefunction';
import { Course } from './Course.js';
import { Group } from './Group.js';
export class Student extends Person {
    #studentScores = new Map();
    #studentFeedback = new Map();
    constructor(id) {
        super(id);
        this.loadFromDatabase();
    }

    async loadFromDatabase() {
        const userData = await getStuData(super.getID());
        
        if (userData) {
            await super.setName(userData.Name);
            await super.setDateOfBirth(userData.DateOfBirth);
            await super.setAddress(userData.Address);
            await super.setFaculity(userData.Faculity);
            await super.setGender(userData.Gender);
        }
    }

    deleteGroup(groupName, courseName){
        for (let [group, score] of this.studentScore.entries()) {
            if (group.getCourse().getName() === courseName && group.getGroupName() === groupName) {
                this.studentScore.delete(group);
                break;
            }
        }
    }
    getGroup(){
        const groups = [];
        for (let group of this.studentScore.keys()) {
            groups.push(group);
        }
        return groups;
    }
    setStudentScore(group, score){
        this.studentScore.set(group, score);
    }
    getStudentScore(groupName){
        for (let [group, score] of this.studentScore.entries()) {
            if (group.getName() === groupName) {
                return score;
            }
        }
        return null;
    }
    getAllScore(){
        return this.#studentScores;
    }
    setStudentFeedback(group, feedback){
        this.#studentFeedback.set(group, feedback);
    }
    getAGroupFeedback( groupName){
        for (let [group, feedback] of this.#studentFeedback.entries()) {
            if (group.getGroupName() === groupName) {
                return feedback;
            }
        }
        return null;
    }
    getAllGroupFeedback(){
        return this.#studentFeedback;
    };
    hasGroup(groups){
        for (let [group] of this.studentScore.keys()) {
            if (group === groups) {
                return true;
            }
        }
        return false;
    }
    hasCourse(course){
        for (let [group] of this.studentScore.keys()) {
            if (group.getCourse() === course) {
                return true;
            }
        }
        return false;
    }
    registerGroup(course, groupName){

    }
}
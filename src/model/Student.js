import { Person } from './Person.js';
import { Course } from './Course.js';
import { Group } from './Group.js';
//Trong moi phuong thuc can them khoi tao doi tuong moi co the goi cac method cua class khac
export class Student extends Person {
    #studentScores = new Map();
    #studentFeedback = new Map();
    constructor(name, dateOfBirth, address, faculity, gender, id) {
        super(name, dateOfBirth, address, faculity, gender, id);
    }
    deleteGroup(groupName, courseName){
        //Can khoi tao doi tuong group va course moi su dung duoc cac method
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
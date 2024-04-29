import { db, ref, set, get, child, update, remove } from '../firebase/firebase';
import { Person } from './Person.js';
import { getStuData } from '../firebase/firebasefunction';
import { Score } from './Score.js';
import { Account } from './Account.js';
export class Student extends Person {
    #studentScores = new Map();
    #studentFeedback = new Map();
    constructor(id) {
        super(id);
        this.loadFromDatabase();
    }

    async loadFromDatabase() {
        const userData = await getStuData(super.getID());
        const userRef = ref(db, `Student/${super.getID()}/Account/Username`);
        const userScore = ref(db, `Student/${super.getID()}/Course/HK222`);
        const snapshot = await get(userRef);
        const scores = await get(userScore);
        if (snapshot.exists()) {
            const username=snapshot.val();
            const account = new Account('Student', username);
            super.setAccount(account);
        } else {
            return null;
        }
        if (userData) {
            await super.setName(userData.Name);
            await super.setDateOfBirth(userData.DateOfBirth);
            await super.setAddress(userData.Address);
            await super.setFaculity(userData.Faculity);
            await super.setGender(userData.Gender);
        }
        const arrayCourse = Object.keys(scores.val() || {});
        for(const courseID of arrayCourse){
            const ScoreData = ref(db, `Student/${super.getID()}/Course/HK222/${courseID}`);
            const snapshot2 = await get(ScoreData);
            const getScore=snapshot2.val(); 
            const value = new Score(getScore.componentScore, getScore.examScore, getScore.totalScore);
            value.setIsAppeal(getScore.isAppeal);
            value.setIsDone(getScore.isDone);
            this.#studentScores.set(courseID, value);
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
    async setExamScore(courseName, scoreData){
        for (let [course, score] of this.#studentScores.entries()) {
            if (course === courseName) {
                const userScore = ref(db, `Student/${super.getID()}/Course/HK222/${courseName}`);
                const snapshot = await get(userScore);
                score.setFinalScore(scoreData);
                if(snapshot.exists()){
                    try {
                        await update(userScore, {
                            examScore: scoreData
                        });
                        alert("User data updated successfully");
                    } catch (error) {
                        console.error("Error updating user data:", error);
                    }
                }
                break;
            }
        }
        return null;
    }
    async setTotalScore(courseName, scoreData){
        for (let [course, score] of this.#studentScores.entries()) {
            if (course === courseName) {
                const userScore = ref(db, `Student/${super.getID()}/Course/HK222/${courseName}`);
                const snapshot = await get(userScore);
                score.setAverScore(scoreData);
                if(snapshot.exists()){
                    try {
                        await update(userScore, {
                            totalScore: scoreData
                        });
                        alert("User data updated successfully");
                    } catch (error) {
                        console.error("Error updating user data:", error);
                    }
                }
                break;
            }
        }
        return null;
    }
    async setComponentScore(courseName, scoreData){
        for (let [course, score] of this.#studentScores.entries()) {
            if (course === courseName) {
                const userScore = ref(db, `Student/${super.getID()}/Course/HK222/${courseName}`);
                const snapshot = await get(userScore);
                score.setComponentScore(scoreData);
                if(snapshot.exists()){
                    try {
                        await update(userScore, {
                            componentScore: scoreData
                        });
                        alert("User data updated successfully");
                    } catch (error) {
                        console.error("Error updating user data:", error);
                    }
                }
                break;
            }
        }
        return null;
    }
    getStudentScore(CourseName){
        for (let [course, score] of this.#studentScores.entries()) {
            if (course === CourseName) {
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
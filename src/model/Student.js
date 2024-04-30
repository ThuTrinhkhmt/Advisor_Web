import { db, ref, set, get, update, remove } from '../firebase/firebase';
import { Person } from './Person.js';
import { getStuData } from '../firebase/firebasefunction';
import { Score } from './Score.js';
import { Account } from './Account.js';
import { WeeklyFeedback } from './WeeklyFeedback.js';
import { Feedback } from './Feedback.js';
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
            //Feedback
            const getData=snapshot2.val(); 
            const userRef2 = ref(db, `Course/${courseID}/Group/${getData.Class}/Student/${super.getID()}/Week`);
            const snapshotData = await get(userRef2);
            const arrayWeek = Object.keys(snapshotData.val() || {});
            const feedback = new Feedback();
            for(const week of arrayWeek){
                const Data = ref(db, `Course/${courseID}/Group/${getData.Class}/Student/${super.getID()}/Week/${week}`);
                const snapshot3 = await get(Data);
                const getValue=snapshot3.val(); 
                feedback.setFeedback(week, getValue.comment, getValue.score);
            }
            this.#studentFeedback.set(courseID, feedback);
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
    async setScore(courseName, compoScore, finalScore, totalScore){
        for (let [course, score] of this.#studentScores.entries()) {
            if (course === courseName) {
                const userScore = ref(db, `Student/${super.getID()}/Course/HK222/${courseName}`);
                const snapshot = await get(userScore);
                score.setAllScore(compoScore, finalScore, totalScore)
                if(snapshot.exists()){
                    try {
                        await update(userScore, {
                            componentScore: compoScore,
                            examScore: finalScore,
                            totalScore: totalScore,
                            isEdited: 1
                        });
                    } catch (error) {
                        console.error("Error updating user data:", error);
                    }
                }
                break;
            }
        }
        return null;
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
                score.setIsDone(true);
                const data= snapshot.val();
                if(snapshot.exists()){
                    try {
                        await update(userScore, {
                            totalScore: scoreData
                        });
                        if(data.isAppeal===true) {
                            await update(userScore, {
                                isEdited: 2,
                                isDone: true
                            });
                        }
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
                    } catch (error) {
                        console.error("Error updating user data:", error);
                    }
                }
                break;
            }
        }
        return null;
    }
    async setIsDone(courseName, isDone){
        for (let [course, score] of this.#studentScores.entries()) {
            if (course === courseName) {
                const userScore = ref(db, `Student/${super.getID()}/Course/HK222/${courseName}`);
                const snapshot = await get(userScore);
                score.setIsDone(isDone);
                if(snapshot.exists()){
                    try {
                        await update(userScore, {
                            isDone: isDone
                        });
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
    async setDay(courseName, startDay, endDay){
        const userScore = ref(db, `Student/${super.getID()}/Course/HK222/${courseName}/appealTime`);
        const snapshot = await get(userScore);
        if(snapshot.exists()){
            try {
                await update(userScore, {
                    EndTime: endDay,
                    StartTime: startDay
                });
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        }
    }
    setStudentFeedback(group, feedback){
        this.#studentFeedback.set(group, feedback);
    }
    getAGroupFeedback(courseName){
        for (let [course, feedback] of this.#studentFeedback.entries()) {
            if (course === courseName) {
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
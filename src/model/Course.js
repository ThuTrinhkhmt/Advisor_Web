import { getCourseData } from '../firebase/firebasefunction';
export class Course {
    #idCourse;
    #name;
    #description;
    #numOfCredit;
    #documents = [];
    #groups = [];
    constructor(idCourse) {
        this.#idCourse=idCourse;
        this.loadFromDatabase();
    }

    async loadFromDatabase() {
        const CourseData = await getCourseData(this.#idCourse);
        
        if (CourseData) {
            this.#name = CourseData.NameOfCourse;
            this.#description = CourseData.Desciption;
            this.#numOfCredit = CourseData.NumOfCredits;
        }
    }

    async setName(name) {
        this.#name = name;
    }

    async getName() {
        return this.#name;
    }

    async setCourseCode(idCourse) {
        this.#idCourse = idCourse;
    }

    async getCourseCode() {
        return this.#idCourse;
    }

    async setDescription(description) {
        this.#description = description;
    }

    async getDescription() {
        return this.#description;
    }

    async setNumOfCredit(numOfCredit) {
        this.#numOfCredit = numOfCredit;
    }

    async getNumOfCredit() {
        return this.#numOfCredit;
    }

    async addDocument(document) {
        this.#documents.push(document);
    }

    async getDocuments() {
        return this.#documents;
    }
    async getGroup(){
        return this.#groups;
    }
    async getAGroup(groupName){
        for (let group of this.groups) {
            if (group.getGroupName() === groupName) {
                return group;
            }
        }
        return null;
    }
    addGroup(groups){
        this.#groups.push(groups);
    }
    deleteGroup(groupName){
        let index = this.groups.findIndex(group => group.getName() === groupName);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    }
}
export class Course {
    #idCourse;
    #name;
    #description;
    #numOfCredit;
    #documents = [];
    #groups = [];
    constructor(idCourse, name, description, numOfCredit) {
        this.#idCourse=idCourse;
        this.#name = name;
        this.#description = description;
        this.#numOfCredit = numOfCredit;
    }

    setName(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    setCourseCode(idCourse) {
        this.#idCourse = idCourse;
    }

    getCourseCode() {
        return this.#idCourse;
    }

    setDescription(description) {
        this.#description = description;
    }

    getDescription() {
        return this.#description;
    }

    setNumOfCredit(numOfCredit) {
        this.#numOfCredit = numOfCredit;
    }

    getNumOfCredit() {
        return this.#numOfCredit;
    }

    addDocument(document) {
        this.#documents.push(document);
    }

    getDocuments() {
        return this.#documents;
    }
    getGroup(){

    }
    getAGroup(groupName){

    }
    addGroup(groups){

    }
    deleteGroup(groupName){
        
    }
}
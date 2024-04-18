export class Course {
    constructor(name, courseCode, description, numOfCredit) {
        this.name = name;
        this.courseCode = courseCode;
        this.description = description;
        this.numOfCredit = numOfCredit;
        this.documents = [];
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setCourseCode(courseCode) {
        this.courseCode = courseCode;
    }

    getCourseCode() {
        return this.courseCode;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    setNumOfCredit(numOfCredit) {
        this.numOfCredit = numOfCredit;
    }

    getNumOfCredit() {
        return this.numOfCredit;
    }

    addDocument(document) {
        this.documents.push(document);
    }

    getDocuments() {
        return this.documents;
    }

    view() {
        console.log("Name Of Course: " + this.name);
        console.log("Code Of Course: " + this.courseCode);
        console.log("Description: " + this.description);
        console.log("Number Of Credits: " + this.numOfCredit);
        console.log("List Of Documents: ");
        if (this.documents.length === 0) {
            console.log("Khong co");
        } else {
            this.documents.forEach(doc => console.log(doc));
        }
    }
}
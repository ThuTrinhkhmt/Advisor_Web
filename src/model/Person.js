export class Person {
    #name
    #dateOfBirth;
    #address;
    #faculity; 
    #gender;
    #ListClass=[];
    #account;
    constructor() {
        this.name = null;
        this.dateOfBirth = null;
        this.address = null;
        this.faculity = null;
        this.gender = null;
        this.ListClass = [];
        this.account = null;
    }

    setName(name) {
        this.name = name;
    }

    setDateOfBirth(dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    setAddress(address) {
        this.address = address;
    }

    setFaculity(faculity) {
        this.faculity = faculity;
    }

    setGender(gender) {
        this.gender = gender;
    }

    addClass(ListClass) {
        this.ListClass = ListClass;
    }

    getName() {
        return this.name;
    }

    getDateOfBirth() {
        return this.dateOfBirth;
    }

    getAddress() {
        return this.address;
    }

    getFaculity() {
        return this.faculity;
    }

    getGender() {
        return this.gender;
    }

    getListClass() {
        return this.ListClass;
    }

    display() {
        throw new Error("Method 'display' must be implemented by subclass");
    }
}
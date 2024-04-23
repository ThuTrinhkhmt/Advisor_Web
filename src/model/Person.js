
import {Account} from './Account';
export class Person {
    #name
    #dateOfBirth;
    #address;
    #faculity; 
    #gender;
    #ListClass;
    #account = new Account(null,null);
    #id;
    constructor(name, dateOfBirth, address, faculity, gender, id) {
        this.#name = name;
        this.#dateOfBirth = dateOfBirth;
        this.#address = address;
        this.#faculity = faculity;
        this.#gender = gender;
        this.#id=id;
        this.#ListClass = [];
    }
    setName(name) {
        this.#name = name;
    }

    setDateOfBirth(dateOfBirth) {
        this.#dateOfBirth = dateOfBirth;
    }

    setAddress(address) {
        this.#address = address;
    }

    setFaculity(faculity) {
        this.#faculity = faculity;
    }

    setGender(gender) {
        this.#gender = gender;
    }

    setAccount(account){
        this.#account=account;
    }

    setID(ID){
        this.#id=ID;
    }

    addClass(ListClass) {
        this.#ListClass = ListClass;
    }

    getName() {
        return this.#name;
    }

    getDateOfBirth() {
        return this.#dateOfBirth;
    }

    getAddress() {
        return this.#address;
    }

    getFaculity() {
        return this.#faculity;
    }

    getGender() {
        return this.#gender;
    }

    getListClass() {
        return this.#ListClass;
    }

    getAccount(){
        return this.#account;
    }

    getID() {
        return this.#id;
    }
    display() {
        throw new Error("Method 'display' must be implemented by subclass");
    }
}
import { db, ref, set, get, child, update, remove } from '../firebase/firebase';
import {Account} from './Account';
import { roleID } from '../loginPage/Login_page';
export class Person {
    #name;
    #dateOfBirth;
    #address;
    #faculity; 
    #gender;
    #account = new Account(null,null);
    #id;
    constructor(id) {
        this.#id=id;
    }
    async setName(newName) {
        const userRef = ref(db, `${roleID}/${this.#id}`);
        try {
            await update(userRef, {
                Name: newName
            });
            this.#name = newName;
            console.log("User data updated successfully");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }
    async setDateOfBirth(dateOfBirth) {
        const userRef = ref(db, `${roleID}/${this.#id}`);
        try {
            await update(userRef, {
                DateOfBirth: dateOfBirth
            });
            this.#dateOfBirth = dateOfBirth;
            console.log("User data updated successfully");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    async setAddress(address) {
        const userRef = ref(db, `${roleID}/${this.#id}`);
        try {
            await update(userRef, {
                Address: address
            });
            this.#address = address;
            console.log("User data updated successfully");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    async setFaculity(faculity) {
        const userRef = ref(db, `${roleID}/${this.#id}`);
        try {
            await update(userRef, {
                Faculity: faculity
            });
            this.#faculity = faculity;
            console.log("User data updated successfully");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    async setGender(gender) {

        const userRef = ref(db, `${roleID}/${this.#id}`);
        try {
            await update(userRef, {
                Gender: gender
            });
            this.#gender = gender;
            console.log("User data updated successfully");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    setAccount(account){
        this.#account=account;
    }

    setID(ID){
        this.#id=ID;
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


    getAccount(){
        return this.#account;
    }

    getID() {
        return this.#id;
    }
}
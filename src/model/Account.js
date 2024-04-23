import { db, ref, set, get, child, update, remove } from '../firebase/firebase';
import { getUserData } from '../firebase/firebasefunction';
export class Account {
    #role;
    #username;
    #password=null;
    #id=null;
    constructor(role, username) {
        this.#role=role;
        this.#username = username;
        this.loadFromDatabase();
    }
    async loadFromDatabase() {
        const userData = await getUserData(this.#role, this.#username);
        
        if (userData) {
            this.#password = userData.Password;
            this.#id = userData.ID;
        }
    }
    getUsername() {
        return this.#username;
    }

    getPassword() {
        return this.#password;
    }

    getId(){
        return this.#id;
    }

    getRole() {
        return this.#role;
    }

    setUsername(username) {
        this.#username = username;
    }

    async setPassword(newPassword) {
        const userRef = ref(db, `Account/${this.#role}/${this.#username}`);
    
        try {
            await update(userRef, {
                Password: newPassword
            });
            this.#password = newPassword;
            alert(this.#password);
            console.log("User data updated successfully");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }
    setId(id){
       this.#id=id;
    }

    setRole(role) {
        this.#role=role;
    }
}
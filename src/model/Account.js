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
    async getUsername() {
        return this.#username;
    }

    async getPassword() {
        return this.#password;
    }

    async getId(){
        return this.#id;
    }

    async getRole() {
        return this.#role;
    }

    async setUsername(username) {
        this.#username = username;
    }

    async setPassword(newPassword) {
        const userRef = ref(db, `Account/${this.#role}/${this.#username}`);
    
        try {
            await update(userRef, {
                Password: newPassword
            });
            this.#password = newPassword;
            console.log("User data updated successfully");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }
    async setId(id){
       this.#id=id;
    }

    async setRole(role) {
        this.#role=role;
    }
}
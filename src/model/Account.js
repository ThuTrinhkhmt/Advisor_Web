import { getUserData, updateUserData, addUserData, deleteUserData } from '../firebase/firebasefunction';
export class Account {
    #role;
    #username;
    #password;
    #id;
    constructor(role, username) {
        this.#role=role;
        this.#id=null;
        this.#username = username;
        this.#password = null;
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

    getRole() {
        return this.#role;
    }

    setUsername(username) {
        this.#username = username;
    }

    setPassword(password) {
        this.#password = password;
    }
}
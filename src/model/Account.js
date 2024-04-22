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

    setPassword(password) {
        this.#password = password;
    }
    setId(id){
       this.#id=id;
    }

    setRole(role) {
        this.#role=role;
    }
}
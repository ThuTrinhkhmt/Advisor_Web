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
    //Ham lay du lieu tu firebase de khoi tao doi tuong
    async loadFromDatabase() {
        const userData = await getUserData(this.#role, this.#username);
        
        if (userData) {
            this.#password = userData.Password;
            this.#id = userData.ID;
        }
    }
    //Cac getter lay du lieu
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
    //Ham de thay doi mat khau
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
    //Cac ham setter o duoi tam thoi khong can, khong co dac quyen
    setUsername(username) {
        this.#username = username;
    }

    setId(id){
       this.#id=id;
    }

    setRole(role) {
        this.#role=role;
    }
}
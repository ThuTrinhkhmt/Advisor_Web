import { Student } from './Student';
import { Teacher } from './Teacher';
import { getUserData } from '../firebase/firebasefunction';
export class PersonFactory {
    static async createPerson(type, username) {
        switch(type) {
            case 'Student':
                const userData = await getUserData('Student', username);
                return new Student(userData.ID);
            case 'Teacher':
                const TeacherData = await getUserData('Teacher', username);
                if(TeacherData){
                    return new Teacher(TeacherData.ID);
                } else{
                    alert("Error");
                }
            default:
                throw new Error(`Invalid person type: ${type}`);
        }
    }
}
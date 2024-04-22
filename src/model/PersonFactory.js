import { Student } from './Student';
import { Teacher } from './Teacher';
import { getPersonData, getStuData } from '../firebase/firebasefunction';
export class PersonFactory {
    static async createPerson(type, id) {
        switch(type) {
            case 'Student':
                const userData = await getStuData(id);
                return new Student(userData.Name, userData.DateOfBirth, userData.Address, userData.Faculity, userData.Gender, userData.ID);
            case 'Teacher':
                const TeacherData = await getPersonData('Teacher', id);
                return new Teacher(TeacherData.Name, TeacherData.DateOfBirth, TeacherData.Address, TeacherData.Faculity, TeacherData.Gender, TeacherData.ID,
                    TeacherData.Specialize, TeacherData.Degree, TeacherData.Position);
            default:
                throw new Error(`Invalid person type: ${type}`);
        }
    }
}
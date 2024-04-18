import { Student } from './Student';
import { Teacher } from './Teacher';
export class PersonFactory {
    static createPerson(type) {
        switch(type) {
            case 'STUDENT':
                return new Student();
            case 'TEACHER':
                return new Teacher();
            default:
                throw new Error(`Invalid person type: ${type}`);
        }
    }
}
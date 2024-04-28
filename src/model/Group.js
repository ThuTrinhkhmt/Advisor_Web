import { db, ref, set, get, child, update, remove } from '../firebase/firebase';
import { getGroupData, getStuData, getTeaData } from '../firebase/firebasefunction';
import { PersonFactory } from './PersonFactory';
export class Group {
    #course;
    #teacher = null;
    #students = []; 
    #name;
    constructor(course, name) {
        this.#course = course;
        this.#name = name;
        this.loadFromDatabase();
    }

    async loadFromDatabase() {
        const groupData = await getGroupData(this.#course, this.#name);
        if (groupData) {
            const TeacherID= groupData.Teacher;
            const TeaData = await getTeaData(TeacherID);;
            const arrayStu = groupData.Student || [];
            if(TeaData) {
                const username= TeaData.Account.Username;
                const teacher = await PersonFactory.createPerson('Teacher', username);
                await teacher.loadFromDatabase();
                this.#teacher=teacher;
            }
            for (const studentID of arrayStu) {
                const StuData = await getStuData(studentID);
                if(StuData) {
                    const username= StuData.Account.Username;
                    const student = await PersonFactory.createPerson('Student', username);
                    await student.loadFromDatabase();
                    this.#students.push(student);
                }
            }
        }
    }

    getTeacher() {
        return this.#teacher;
    }

    async setTeacher(teacher) {
        const userRef = ref(db, `Course/${this.#course}/Group/${this.#name}`);
        try {
            await update(userRef, {
                Teacher: teacher
            });
            this.#teacher = teacher;
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    getStudents() {
        return this.#students;
    }

    setStudents(students) {
        this.#students = students;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getCourse() {
        return this.#course;
    }

    setCourse(course) {
        this.#course = course;
    }
    async addStudent(studentID) {
        const userRef = ref(db, `Course/${this.#course}/Group/${this.#name}/Student`);
        try {
            const StuData = await getStuData(studentID);
            if(StuData) {
                const username= StuData.Account.Username;
                const student = await PersonFactory.createPerson('Student', username);
                await student.loadFromDatabase();
                const snapshot = await get(userRef);
                let currentStudents = snapshot.val() || [];
                // Thêm sinh viên mới vào mảng danh sách sinh viên hiện tại
                currentStudents.push(studentID);
                // Cập nhật mảng Student trong cơ sở dữ liệu
                await set(userRef, currentStudents);
                // Cập nhật mảng students của đối tượng Group
                this.#students.push(student);
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
	}
    async removeStudent(id) {
        let indexToRemove = -1;
        for (let i = 0; i < this.#students.length; i++) {
            if (this.#students[i].getAccount().getId() === id) {
                indexToRemove = i;
                break;
            }
        }

        if (indexToRemove !== -1) {
            const userRef = ref(db, `Course/${this.#course}/Group/${this.#name}/Student`);
            try {
                const snapshot = await get(userRef);
                let currentStudents = snapshot.val() || [];
                // Xóa sinh viên khỏi mảng danh sách sinh viên hiện tại
                currentStudents.splice(indexToRemove, 1);
                // Cập nhật mảng Student trong cơ sở dữ liệu
                await set(userRef, currentStudents);
                // Cập nhật mảng students của đối tượng Group
                this.#students = currentStudents;
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        }
    }
    isFull() {
		if (this.#students.size() >= 40) return true;
		else return false;
	}
    getAStudent(id) {
        for (let student of this.students) {
            if (student.getAccount().getId() === id) {
                return student;
            }
        }
        return null;
    }
}
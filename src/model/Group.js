import { db, ref, set, get, update, remove } from '../firebase/firebase';
import { getGroupData, getStuData, getTeaData, getCourseData } from '../firebase/firebasefunction';
import { PersonFactory } from './PersonFactory';
export class Group {
    #coursename;
    #course;
    #teacher = null;
    #students = [];
    #name;
    #documents=[];
    #dayofWeek;
    #startTime;
    #endTime;
    constructor(course, name) {
        this.#course = course;
        this.#name = name;
    }

    async loadFromDatabase() {
        const groupData = await getGroupData(this.#course, this.#name);
        const courseData = await getCourseData(this.#course);
        this.#coursename = courseData.NameOfCourse;
        if (groupData) {
            const TeacherID= groupData.Teacher;
            const arrayStu = Object.keys(groupData.Student || {});
            this.#teacher=TeacherID;
            for (const studentID of arrayStu) {
                const StuData = await getStuData(studentID);
                if(StuData) {
                    const Ref = ref(db, `Student/${studentID}/Account/Username`);
                    const snapshot = await get(Ref);
                    const username = snapshot.val();
                    const student = await PersonFactory.createPerson('Student', username);
                    await student.loadFromDatabase();
                    this.#students.push(student);
                }
            }
        }
        const userRef = ref(db, `Course/${this.#course}/Group/${this.#name}/AboutCourse/Document`);
        const snapshot = await get(userRef);
        const arrayDoc = Object.keys(snapshot.val() || {});
        for(const doc of arrayDoc){
            const userRef2 = ref(db, `Course/${this.#course}/Group/${this.#name}/AboutCourse/Document/${doc}`);
            const snapshot2 = await get(userRef2);
            const data = snapshot2.val();
            const docData={};
            docData.name=data.name;
            docData.url=data.url;
            this.#documents.push(docData);
        }
    }

    getTeacher() {
        return this.#teacher;
    }

    async setTeacher(teacherID) {
        const userRef = ref(db, `Course/${this.#course}/Group/${this.#name}`);
        const TeaData = await getTeaData(teacherID);
        try {
            await set(userRef, {
                Teacher: teacherID
            });
            await update(userRef, {
                Teacher: teacherID
            });
            if(TeaData) {
                const username= TeaData.Account.Username;
                const teacher = await PersonFactory.createPerson('Teacher', username);
                await teacher.loadFromDatabase();
                this.#teacher=teacher;
            }
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

    getCourseName() {
        return this.#coursename;
    }
    
    setDayofWeek(week){
        this.#dayofWeek=week;
    }

    setName(name) {
        this.#name = name;
    }

    setStartDay(day){
        this.#startTime=day;
    }

    setEndDay(day){
        this.#endTime=day;
    }
    async changeDocument(index, document){
        this.#documents[index]=document;
        const userRef2 = ref(db, `Course/${this.#course}/Group/${this.#name}/AboutCourse/Document/${index}`);
        const snapshot2 = await get(userRef2);
        if(snapshot2.exists()){
            try {
                await update(userRef2, {
                    name: document.name,
                    url: document.url
                });
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        }
    }
    async addDocument(document) {
        this.#documents.push(document);
        const length= this.#documents.length;
        const userRef2 = ref(db, `Course/${this.#course}/Group/${this.#name}/AboutCourse/Document/${length-1}`);
        const newNodeData = {
            name: document.name,
            url: document.url
        };
        alert(`Tài liệu đã được thêm: ${document.name}`);
        await set(userRef2, newNodeData);
    }
    async removeDocument(document) {
        const index = this.#documents.findIndex((doc) => doc.name === document.name && doc.url === document.url);

    if (index !== -1) {
        // Xóa tài liệu khỏi danh sách
        alert(`Tài liệu đã bị xóa: ${document.name}`);
        this.#documents.splice(index, 1);
        // Tham chiếu đến nút cần xóa
        const nodePath = `Course/${this.#course}/Group/${this.#name}/AboutCourse/Document/${index}`;
        const nodeRef = ref(db, nodePath);
        await remove(nodeRef);
    } else {
        alert("Không tìm thấy tài liệu cần xóa");
    }
    }
    getDocuments() {
        return this.#documents;
    }
    getStartDay(){
        return this.#startTime;
    }
    getEndDay(){
        return this.#endTime;
    }
    getCourseID() {
        return this.#course;
    }
    getDayofWeek(){
        return this.#dayofWeek;
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
        for (let student of this.#students) {
            if (student.getAccount().getId() === id) {
                return student;
            }
        }
        return null;
    }
}
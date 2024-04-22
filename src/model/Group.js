export class Group {
    #course;
    #teacher = null;
    #students = []; 
    #name;
    constructor(course, name) {
        this.#course = course;
        this.#name = name;
    }

    getTeacher() {
        return this.#teacher;
    }

    setTeacher(teacher) {
        this.#teacher = teacher;
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
    addStudent(student) {
		this.#students.push_back(student);
	}
    removeStudent(id) {
        let index = 0;
        while (index < this.students.length) {
            if (this.students[index].getAccount().getId() === id) {
                this.students.splice(index, 1);
                break;
            }
            index++;
        }
    }
    isFull() {
		if (this.students.size() >= 40) return true;
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
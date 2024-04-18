export class Lop {
    constructor(course, teacher, students, name) {
        this.course = course;
        this.teacher = teacher;
        this.students = students;
        this.name = name;
    }

    getTeacher() {
        return this.teacher;
    }

    setTeacher(teacher) {
        this.teacher = teacher;
    }

    getStudents() {
        return this.students;
    }

    setStudents(students) {
        this.students = students;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getCourse() {
        return this.course;
    }

    setCourse(course) {
        this.course = course;
    }

    view() {
        console.log("Teacher: " + this.teacher.getName());
        console.log("List of students: ");
        if (!this.students || this.students.length === 0) {
            console.log("Khong co");
        } else {
            this.students.forEach(student => console.log(student.getName()));
        }
        console.log("Name: " + this.name);
        console.log("Course: ");
        this.course.view();
    }

    viewScore() {
        this.students.forEach(student => student.viewPoint());
    }
}
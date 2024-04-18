export class Score {
    constructor(cl, studentID, course) {
        this.cl = cl;
        this.studentID = studentID;
        this.course = course;
        this.DiemThanhPhan = 0;
        this.DiemGiuaKi = 0;
        this.DiemCuoiKy = 0;
    }

    getDiemThanhPhan() {
        return this.DiemThanhPhan;
    }

    setDiemThanhPhan(DiemThanhPhan) {
        this.DiemThanhPhan = DiemThanhPhan;
    }

    getDiemGiuaKi() {
        return this.DiemGiuaKi;
    }

    setDiemGiuaKi(DiemGiuaKi) {
        this.DiemGiuaKi = DiemGiuaKi;
    }

    getDiemCuoiKy() {
        return this.DiemCuoiKy;
    }

    setDiemCuoiKy(DiemCuoiKy) {
        this.DiemCuoiKy = DiemCuoiKy;
    }
}
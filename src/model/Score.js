export class Score {
    #componentScore;
	#finalScore;
	#aveScore;
	#isEditing;
	#isEdited;
	#appeal;
	#isDone;
    constructor(componentScore, finalScore, aveScore, isEdited, appeal, isDone) {
        this.#componentScore = componentScore;
        this.#aveScore = finalScore = finalScore;
		this.#aveScore = aveScore;
		this.#isEditing = false;
		this.#isEdited = isEdited;
		this.#appeal = appeal;
		this.#isDone = isDone;
    }

    setAllScore(componentScore, finalScore, aveScore) {
		this.#componentScore = componentScore;
		this.#finalScore = finalScore;
		this.#aveScore = aveScore;
		this.#isEdited = 1;
	}
    getComponentScore() {
		return this.#componentScore;
	}
	getFinalScore() {
		return this.#finalScore;
	}
	getAverScore() {
		return this.#aveScore;
	}
    editScore(finalScore, aveScore) {
		this.#finalScore = finalScore;
		this.#aveScore = aveScore;
		this.#isEdited = 2;
	}
	setIsEditing(isEditing) {
		this.#isEditing = isEditing;
	}
	getIsEditing() {
		return this.#isEditing;
	}
	setAppeal(appeal) {
		this.#appeal = appeal;
	}
	getAppeal() {
		return this.#appeal;
	}
	setIsDone(isDone) {
		this.#isDone = isDone;
	}
	getIsDone() {
		return this.#isDone;
	}
    getIsEdited() {
		return this.#isEdited;
	}
}
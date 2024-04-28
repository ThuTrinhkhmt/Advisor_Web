export class Score {
    #componentScore;
	#finalScore;
	#aveScore;
	#startAppeal;
	#isEditing;
	#isEdited;
	#isAppeal;
	#isDone;
    constructor(componentScore, finalScore, aveScore) {
        this.#componentScore = componentScore;
        this.#finalScore = finalScore;
		this.#aveScore = aveScore;
		this.#isEditing = false;
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
	setIsAppeal(appeal) {
		this.#isAppeal = appeal;
	}
	getIsAppeal() {
		return this.#isAppeal;
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
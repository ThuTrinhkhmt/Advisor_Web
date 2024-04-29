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
		this.#isEdited=0;
		this.#isDone=true;
    }

    setAllScore(componentScore, finalScore, aveScore) {
		this.#componentScore = componentScore;
		this.#finalScore = finalScore;
		this.#aveScore = aveScore;
		this.#isEdited = 1;
	}
	setComponentScore(componentScore) {
		this.#componentScore = componentScore;
		if(this.#isAppeal===false) {this.#isEdited = 1;} else this.#isEdited=2;
	}
	setFinalScore(finalScore){
		this.#finalScore=finalScore;
		//if(this.#isAppeal===false) {this.#isEdited = 1;} else this.#isEdited=2;
	}
	setAverScore(aveScore){
		this.#aveScore=aveScore;
		if(this.#isAppeal===false) {this.#isEdited = 1;} else this.#isEdited=2;
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
    editScore(finalScore,aveScore) {
		this.#finalScore = finalScore;
		this.#aveScore=aveScore;
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
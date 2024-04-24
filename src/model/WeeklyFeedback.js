export class WeeklyFeedback {
    #comment;
    #rate;
    constructor(comment, rate) {
        this.#comment = comment;
        this.#rate = rate;
    }

    setComment(comment) {
        this.#comment = comment;
    }

    getComment() {
        return this.#comment;
    }

    setRate(rate) {
        this.#rate = rate;
    }

    getRate() {
        return this.#rate;
    }
}
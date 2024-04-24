class Feedback {
    #week;
    constructor() {
        this.#week = new Map();
    }

    setFeedback(week, comment, rate) {
        this.#week.set(week, new WeeklyFeedback(comment, rate));
    }

    getAFeedback(week) {
        return this.#week.get(week);
    }

    getFeedback() {
        return this.#week;
    }
}
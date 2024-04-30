import { WeeklyFeedback } from './WeeklyFeedback';
export class Feedback {
    #week;
    constructor() {
        this.#week = new Map();
    }

    setFeedback(week, comment, rate) {
        this.#week.set(week, new WeeklyFeedback(comment, rate));
    }

    getAFeedback(weekData) {
        for (let [week, feedback] of this.#week.entries()) {
            if (week === weekData) {
                return feedback;
            }
        }
        return null;
    }

    getFeedback() {
        return this.#week;
    }
}
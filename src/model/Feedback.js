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
    removeAFeedback(weekData) {
        if (this.#week.has(weekData)) {
            const removedFeedback = this.#week.get(weekData); // Lấy phản hồi đã xóa
            this.#week.delete(weekData); // Xóa phản hồi dựa trên `weekData`
            return removedFeedback; // Trả về phản hồi đã xóa
        }
        return null;
    }

    getFeedback() {
        return this.#week;
    }
}
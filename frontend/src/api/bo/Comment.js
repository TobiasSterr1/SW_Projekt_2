import BusinessObject from './BusinessObject';


export default class Comment extends BusinessObject {
    constructor(text, person_id, card_id) {
        super();
        this.text = text;
        this.person_id = person_id;
        this.card_id = card_id;
    }

    setText(text) {
        this.text = text;
    }

    getText() {
        return this.text;
    }

    setPersonId(person_id) {
        this.person_id = person_id;
    }

    getPersonId() {
        return this.person_id;
    }

    setCardId(card_id) {
        this.card_id = card_id;
    }

    getCardId() {
        return this.card_id;
    }

    static fromJSON(comment) {
        let result = [];
        if (Array.isArray(comment)) {
            comment.forEach((c) => {
                Object.setPrototypeOf(c, Comment.prototype);
                result.push(c);
            })
        } else {
            let c = comment;
            Object.setPrototypeOf(c, Comment.prototype);
            result.push(c);
        }
        return result;
    }
}
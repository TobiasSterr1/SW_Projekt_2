import BusinessObject from './BusinessObject';


export default class Card extends BusinessObject {
    constructor(title, person_id, project_id, phase_id, starts_at, ends_at, description, points) {
        super();
        this.title = title;
        this.description = description;
        this.points = points;
        this.person_id = person_id;
        this.project_id = project_id;
        this.phase_id = phase_id;
        this.starts_at = starts_at;
        this.ends_at = ends_at;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    setPoints(points) {
        this.points = points;
    }

    getPoints() {
        return this.points;
    }

    setPersonId(person_id) {
        this.person_id = person_id;
    }

    getPersonId() {
        return this.person_id;
    }

    setProjectId(project_id) {
        this.project_id = project_id;
    }

    getProjectId() {
        return this.project_id;
    }

    setPhaseId(phase_id) {
        this.phase_id = phase_id;
    }

    getPhaseId() {
        return this.phase_id;
    }

    setStartsAt(starts_at) {
        this.starts_at = starts_at;
    }

    getStartsAt() {
        return this.starts_at;
    }

    setEndsAt(ends_at) {
        this.ends_at = ends_at;
    }

    getEndsAt() {
        return this.ends_at;
    }

    static fromJSON(card) {
        let result = [];
        if (Array.isArray(card)) {
            card.forEach((c) => {
                Object.setPrototypeOf(c, Card.prototype);
                result.push(c);
            })
        } else {
            let c = card;
            Object.setPrototypeOf(c, Card.prototype);
            result.push(c);
        }
        return result;
    }
}
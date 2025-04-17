import BusinessObject from './BusinessObject';


export default class Project extends BusinessObject {
    constructor(title, person_id, starts_at, ends_at, description) {
        super();
        this.title = title;
        this.person_id = person_id;
        this.starts_at = starts_at;
        this.ends_at = ends_at;
        this.description = description;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setPersonId(person_id) {
        this.person_id = person_id;
    }

    getPersonId() {
        return this.person_id;
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

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    static fromJSON(project) {
        let result = [];
        if (Array.isArray(project)) {
            project.forEach((p) => {
                Object.setPrototypeOf(p, Project.prototype);
                result.push(p);
            })
        } else {
            let p = project;
            Object.setPrototypeOf(p, Project.prototype);
            result.push(p);
        }
        return result;
    }
}
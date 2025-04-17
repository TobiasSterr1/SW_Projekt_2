import BusinessObject from './BusinessObject';


export default class Phase extends BusinessObject {
    constructor(name, description) {
        super();
        this.name = name;
        this.description = description;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    static fromJSON(phase) {
        let result = [];
        if (Array.isArray(phase)) {
            phase.forEach((p) => {
                Object.setPrototypeOf(p, Phase.prototype);
                result.push(p);
            })
        } else {
            let p = phase;
            Object.setPrototypeOf(p, Phase.prototype);
            result.push(p);
        }
        return result;
    }
}
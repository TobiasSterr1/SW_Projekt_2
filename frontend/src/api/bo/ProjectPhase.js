export default class ProjectPhase {
    constructor(project_id, phase_id, rank) {
        this.project_id = project_id;
        this.phase_id = phase_id;
        this.rank = rank;
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

    setRank(rank) {
        this.rank = rank;
    }

    getRank() {
        return this.rank;
    }

    static fromJSON(pp) {
        let result = [];
        if (Array.isArray(pp)) {
            pp.forEach((p) => {
                Object.setPrototypeOf(p, ProjectPhase.prototype);
                result.push(p);
            })
        } else {
            let p = pp;
            Object.setPrototypeOf(p, ProjectPhase.prototype);
            result.push(p);
        }
        return result;
    }
}
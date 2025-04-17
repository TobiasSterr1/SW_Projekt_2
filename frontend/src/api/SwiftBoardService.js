import SwiftBoardAPI from "./SwiftBoardAPI";

export default class SwiftBoardService {
    static async calculProjectTime(projectId) {
        project = await SwiftBoardAPI.getAPI().getProjectById(projectId);
        const endTime = new Date(project.getEndsAt());
        const startTime = new Date(project.getStartsAt());
        const duration = endTime.getTime() - startTime.getTime();
        return duration;
    }

    static async calculProjectRestTime(projectId) {
        project = await SwiftBoardAPI.getAPI().getProjectById(projectId);
        const endTime = new Date();
        const startTime = new Date(project.getStartsAt());
        const duration = endTime.getTime() - startTime.getTime();
        return duration;
    }

    static async calculProjectUsedTime(projectId) {
        projectCard = await SwiftBoardAPI.getAPI().getCardByProjectId(projectId);
        totaltime = projectCard.reduce((acc, card) => {
            const endTime = new Date(card.getEndsAt());
            const startTime = new Date(card.getCreatedAt());
            const duration = endTime.getTime() - startTime.getTime();
            return acc + duration;
        }, 0);
        return totaltime;
    }

    static async calculCardsTotalTime(cards) {
        totaltime = cards.reduce((acc, card) => {
            const endTime = new Date(card.getEndsAt());
            const startTime = new Date(card.getCreatedAt());
            const duration = endTime.getTime() - startTime.getTime();
            return acc + duration;
        }, 0);
        return totaltime;
    }
}
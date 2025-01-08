import { ProStatus } from "state/type"

export const getProjectStatus = (p:any, address?: any) => {
    if (p.status !== ProStatus.COMPLETED) {
        const currentTime = Date.now();
        const pledgeStartDateTimeStamp = new Date(p.pledgeStartDate).getTime();
        const pledgeEndDateTimeStamp = new Date(p.pledgeEndDate).getTime();
        const contributionStartDateTimeStamp = new Date(p.contributionStartDate).getTime();
        const contributionEndDateTimeStamp = new Date(p.contributionEndDate).getTime();

        if (currentTime < pledgeStartDateTimeStamp) {
            return ProStatus.UPCOMING;
        }
        const participants = p.allocation?.participants?.map((p: { eoa: string }) => p.eoa) ||[];
        const participated = address && participants.includes(address)
        if (currentTime < pledgeEndDateTimeStamp) {
            if (participated) {
                return ProStatus.PARTICIPATED
            }      
            return ProStatus.PLEDGING;
        }
        if (currentTime < contributionStartDateTimeStamp) {
            return ProStatus.LOTTERY;
        }
        if (currentTime < contributionEndDateTimeStamp) {
            const contributions = p.contributions?.map((c: { eoa: string }) => c.eoa) ||[];
            if (address && contributions.includes(address)) {
                return ProStatus.CONTRIBUTED;
            }
            const winners = p.allocation?.winners?.map((c: { eoa: string }) => c.eoa) ||[];
            if (address && participated) {
                if (winners.includes(address)) {
                    return ProStatus.WIN;
                } else {
                    return ProStatus.NOTWIN;
                }
            }
            return ProStatus.CONTRIBUTING;
        }
    }
    return ProStatus.COMPLETED;
}

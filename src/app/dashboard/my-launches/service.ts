import { ProStatus } from "state/type";

export const getTableData = (p:any, status: ProStatus, uid?: string) => {
    let tbdata: any = {}
    tbdata['btn'] = `View Details`
    if (status === ProStatus.PLEDGING) {
        tbdata['phase'] = [`Application period:`, `${p.pledgeStartDate} – ${p.pledgeEndDate}`]
        tbdata['btn'] = `Participate`
    } else if (status === ProStatus.PARTICIPATED) {
        tbdata['phase'] = [`Lottery: ${p.pledgeEndDate}`]
    } else if (status === ProStatus.WIN) {
        tbdata['phase'] = [`Contribution:`, `${p.contributionStartDate} – ${p.contributionEndDate}`]
        tbdata['btn'] = `Contribute`
    } else if (status === ProStatus.NOTWIN) {
        tbdata['phase'] = [`Contribution:`, `${p.contributionStartDate} – ${p.contributionEndDate}`]
    } else if (status === ProStatus.CONTRIBUTING) {
        tbdata['phase'] = [`Contribution:`, `${p.contributionStartDate} – ${p.contributionEndDate}`]
    } else if (status === ProStatus.CONTRIBUTED) {
        tbdata['phase'] = [`Completed`]
    } else if (status === ProStatus.COMPLETED) {
        tbdata['phase'] = ['Ended']
    } else {
        tbdata['phase'] = ['TBA']
    }
    return tbdata
}

export const getPaginatedList = (totalList: any, page: number, perPage: number) => {
    // Calculate start and end indices
    const start = (page - 1) * perPage;
    const end = start + perPage;

    // Return the sliced array
    return totalList.slice(start, end);
}


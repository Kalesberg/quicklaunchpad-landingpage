export const getPaginatedList = (totalList: any, page: number, perPage: number) => {
    // Calculate start and end indices
    const start = (page - 1) * perPage;
    const end = start + perPage;

    // Return the sliced array
    return totalList.slice(start, end);
}

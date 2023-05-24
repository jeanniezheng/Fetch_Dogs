export const handleSort = (event, setSortField, setSort) => {
    const selectedSortOption = event.target.value;

    const [sortField, sortDirection] = selectedSortOption.split('-');
    setSortField(sortField);
    setSort(sortDirection);
};
export function filterAndSortCategories(categories) {
    // Filter categories where show_on_header is equal to 1
    const filteredCategories = categories?.filter(category => category?.show_on_header == 1);

    // Sort filtered categories by position number
    // filteredCategories?.sort((a, b) => a.position - b.position);

    return filteredCategories;
}

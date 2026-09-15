function generatePaginationLinks(baseUrl, currentPage, lastPage, perPage, total, nextPageUrl, prevPageUrl) {
    const links = [];
    const maxPageLinks = 10;  // Maximum number of page links to show in the pagination

    // Previous button
    links.push({
        url: prevPageUrl,
        label: "&laquo; Previous",
        active: false,
    });

    // Determine the start and end page for pagination
    let startPage = Math.max(currentPage - Math.floor(maxPageLinks / 2), 1);
    let endPage = Math.min(currentPage + Math.floor(maxPageLinks / 2), lastPage);

    // Adjust range if not enough pages before or after the current page
    if (endPage - startPage + 1 < maxPageLinks) {
        if (currentPage <= Math.floor(maxPageLinks / 2)) {
            endPage = Math.min(maxPageLinks, lastPage);
        } else {
            startPage = Math.max(lastPage - maxPageLinks + 1, 1);
        }
    }

    // Page number links
    for (let i = startPage; i <= endPage; i++) {
        links.push({
            url: `${baseUrl}?page=${i}`,
            label: `${i}`,
            active: i === currentPage,
        });
    }

    // Ellipsis (...) if there are skipped pages
    if (endPage < lastPage) {
        links.push({
            url: null,
            label: "...",
            active: false,
        });
    }

    // Last page link
    if (lastPage > endPage) {
        links.push({
            url: `${baseUrl}?page=${lastPage}`,
            label: `${lastPage}`,
            active: false,
        });
    }

    // Next button
    links.push({
        url: nextPageUrl,
        label: "Next &raquo;",
        active: false,
    });

    return links;
}

// export the function
module.exports = generatePaginationLinks;
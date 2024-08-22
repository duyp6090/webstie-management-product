function pagination(objectPagination, query, totalProducts) {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }

    //  Skip Products
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limit;

    // Total Pages
    const totalPages = Math.ceil(totalProducts / objectPagination.limit);
    objectPagination.totalPages = totalPages;

    return objectPagination;
}

module.exports = pagination;

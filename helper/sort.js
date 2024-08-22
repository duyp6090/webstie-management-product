function sort(query) {
    // Init object sort
    let sort = {};

    // Get infomation sort from request
    const sortParams = query.sort;

    // Check type sort
    if (sortParams == undefined) {
        sort["meta.createdAt"] = -1;
    } else {
        // Get type sort and value sort
        const [typeSort, valueSort] = sortParams.split("-");
        sort[typeSort] = valueSort;
    }

    return sort;
}

module.exports = sort;

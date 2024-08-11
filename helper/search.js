function search(query) {
    //  oject to store find condition
    let objectSeacrh = {
        keyword: "",
        regex: "",
    };

    // Search Find
    objectSeacrh.keyword = query.search;

    if (objectSeacrh.keyword) {
        objectSeacrh.regex = new RegExp(objectSeacrh.keyword, "i");
    }

    return objectSeacrh;
}

module.exports = search;

function findParentById(categories) {
    // idConvertToTitle
    let idConvertToCategory = {};

    // Loop through the categories
    categories.forEach((category) => {
        idConvertToCategory[category._id] = category;
    });

    // array to store parent categories
    arrParentCategories = [];

    // Loop through the categories
    categories.forEach((category) => {
        if (category.parent_id && idConvertToCategory[category.parent_id]) {
            parentCategory = idConvertToCategory[category.parent_id];
            // Assign caregory id to parent id
            if (parentCategory.subCategory) {
                parentCategory.subCategory.push(category);
            } else {
                parentCategory.subCategory = [category];
            }
        } else {
            arrParentCategories.push(category);
        }
    });

    // Return titleIdObject
    return arrParentCategories;
}

module.exports = findParentById;

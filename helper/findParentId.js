function findParentById(categories) {
    // idConvertToTitle
    let idConvertToCategory = {};

    // Loop through the categories
    categories.forEach((category) => {
        idConvertToCategory[category._id] = category;
    });

    // subTitleIdObject
    let titleIdObject = {};

    // Loop through the categories
    categories.forEach((category) => {
        // Check parent_id and parent exists in list categories
        if (category.parent_id && idConvertToCategory[category.parent_id]) {
            // Convert parent_id to category
            let parentCategory = idConvertToCategory[category.parent_id];

            // Get parent title
            let parentTitle = parentCategory.title;

            // Check if parent_id exists in the object
            if (titleIdObject[parentTitle]) {
                titleIdObject[parentTitle].push(category);
            } else {
                // Add category to subtiteIdObject
                titleIdObject[parentTitle] = [parentCategory, category];
            }
        } else {
            // Convert _id to title
            let parentCategory = idConvertToCategory[category._id];

            // Add category to subtiteIdObject
            titleIdObject[parentCategory.title] = [parentCategory];
        }
    });

    // Return titleIdObject
    return titleIdObject;
}

module.exports = findParentById;

function findParentById(categories) {
    // idConvertToTitle
    let idConvertToTitle = {};

    // Loop through the categories
    categories.forEach((category) => {
        idConvertToTitle[category._id] = category.title;
    });

    // subTitleIdObject
    let titleIdObject = {};

    // Loop through the categories
    categories.forEach((category) => {
        // Object save subtitle and id of category
        let subTitleIdObject = {
            title: category.title,
            id: category._id,
        };

        // Check parent_id
        if (category.parent_id) {
            // Convert parent_id to title
            parentTitle = idConvertToTitle[category.parent_id];

            // Check if parent_id exists in the object
            if (titleIdObject[parentTitle]) {
                titleIdObject[parentTitle].push(subTitleIdObject);
            } else {
                // Object parentTitle
                let parentTitleObject = {
                    title: parentTitle,
                    id: category.parent_id,
                };

                // Add category to subtiteIdObject
                titleIdObject[parentTitle] = [parentTitleObject, subTitleIdObject];
            }
        } else {
            // Convert _id to title
            title = idConvertToTitle[category._id];

            // Add category to subtiteIdObject
            titleIdObject[title] = [subTitleIdObject];
        }
    });

    return titleIdObject;
}

module.exports = findParentById;

function findSubcategories(idCategory, categories) {
    // List of subcategories
    let subcategories = [idCategory];

    // Loop through the categories
    categories.forEach((category) => {
        // Get parent_id of category
        let parentId = category.parent_id;

        // While category has parent_id = "" or parent_id of categoryNeedFind
        while (parentId !== "") {
            if (parentId == idCategory) {
                subcategories.push(category._id.toString());
                break;
            }

            // Find parent category
            let parentCategory = categories.find((category) => {
                return category._id.toString() == parentId;
            });

            // Not found parent category
            if (!parentCategory) {
                break;
            }

            // Update parentId
            parentId = parentCategory.parent_id;
        }
    });

    // Return subcategories
    return subcategories;
}

module.exports = findSubcategories;

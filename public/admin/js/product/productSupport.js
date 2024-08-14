function HandleCheckbox(InputGetMultiId) {
    const checkboxALL = document.querySelector("input[type=checkbox]");
    const checkboxItem = document.querySelectorAll("input[type=checkbox][name=id]");

    // Get id from changeable items
    function getMultiIdToChangeStatus() {
        let ids = [];
        checkboxItem.forEach((checkbox) => {
            if (checkbox.checked) {
                ids.push(checkbox.value);
            }
        });
        return ids.join(",");
    }

    // Hanlde checkbox all
    checkboxALL.addEventListener("change", () => {
        checkboxItem.forEach((checkbox) => {
            checkbox.checked = checkboxALL.checked;
        });

        // Call function get multiId to change status
        let ids = getMultiIdToChangeStatus();

        // Set value for input
        InputGetMultiId.value = ids;
    });

    // Handle checkbox item
    checkboxItem.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            numberCheckedItems = Array.from(checkboxItem).filter(
                (checkbox) => checkbox.checked == true
            );
            if (numberCheckedItems.length == checkboxItem.length) {
                checkboxALL.checked = true;
            } else {
                checkboxALL.checked = false;
            }

            // Call function get multiId to change status
            let ids = getMultiIdToChangeStatus();

            // Set value for input
            InputGetMultiId.value = ids;
        });
    });
}

// Export module
export default { HandleCheckbox };

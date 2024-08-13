// Change status
const buttonChnageStatus = document.querySelectorAll("[button-change-status]");
const formChangeStatus = document.getElementById("form-change-status");
const path = formChangeStatus.getAttribute("data-path");

buttonChnageStatus.forEach((button) => {
    button.addEventListener("click", () => {
        // Get status current and id
        const statusCurrent = button.getAttribute("data-status");
        const id = button.getAttribute("data-id");

        // Re-set status
        let statusChange = statusCurrent == "active" ? "inactive" : "active";

        // Set action form
        const action = `${path}/${statusChange}/${id}?_method=PATCH`;
        formChangeStatus.setAttribute("action", action);

        // Submit form
        formChangeStatus.submit();
    });
});

// End change status

// Change multi status
const formChangeMulti = document.getElementById("form-change-multi");
const typeChangeMulti = formChangeMulti.querySelector("select[name=type]");
const inputChangeMultiStatus = document.querySelector("input[name=ids]");
const checkboxALL = document.querySelector("input[type=checkbox]");
const checkboxItem = document.querySelectorAll("input[type=checkbox][name=id]");

// Function to get multi id to change status
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
    inputChangeMultiStatus.value = ids;
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
        inputChangeMultiStatus.value = ids;
    });
});

//  Handle submid form
formChangeMulti.addEventListener("submit", (e) => {
    // Preventd default
    e.preventDefault();

    // Check conditon to submit form
    if (inputChangeMultiStatus.value == "") {
        alert("Please select the product to change status");
    } else if (typeChangeMulti.value == "") {
        alert("Please select the type to change status");
    } else {
        formChangeMulti.submit();
    }
});

// End change multi status

// Handle delete product
const formDeleteProduct = document.getElementById("form-delete-product");
const buttonDeleteproduct = document.querySelectorAll("button[button-delete]");

// Handle click button delete
buttonDeleteproduct.forEach((button) => {
    button.addEventListener("click", () => {
        // Get id product
        const id = button.getAttribute("data-id");

        // Confirm delete product
        const isConfirm = confirm("Are you sure you want to delete this product?");

        if (isConfirm) {
            const path = formDeleteProduct.getAttribute("data-path");

            // Set action form
            const action = path + `/${id}?_method=DELETE`;
            formDeleteProduct.setAttribute("action", action);

            // Submit form
            formDeleteProduct.submit();
        }
    });
});

// End delete product

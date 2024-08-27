// Import utility helpers
import utilityHelper from "../utility/handleCheckBock.js";

// End change status one product

// Change multi status products
const formChangeMulti = document.getElementById("form-change-multi");
const typeChangeMulti = formChangeMulti.querySelector("select[name=type]");
const inputChangeMultiStatus = formChangeMulti.querySelector("input[name=ids]");

// Handle checkbox
utilityHelper.HandleCheckbox(inputChangeMultiStatus);

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
        // Check type delete
        if (typeChangeMulti.value == "delete") {
            const isConfirm = confirm("Are you sure you want to delete this product?");
            if (isConfirm) {
                formChangeMulti.submit();
            }
        } else formChangeMulti.submit();
    }
});

// End change multi status products
// Delete product temporatity
const formDeleteProduct = document.getElementById("form-delete-role");
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

// End delete product temporatity

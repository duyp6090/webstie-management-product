// Import productSupport
import productSupport from "./productSupport.js";

// Handle delete - restore multi products
const formDeleteRestoreMultiProduct = document.getElementById("form-delete-restore");
const typeDeleteRestoreMulti = formDeleteRestoreMultiProduct.querySelector("select[name=type]");
const inputDeleteRestoreMulti = formDeleteRestoreMultiProduct.querySelector("input[name=ids]");

// Handle checkbox
productSupport.HandleCheckbox(inputDeleteRestoreMulti);

// Handle submit form
formDeleteRestoreMultiProduct.addEventListener("submit", (e) => {
    // Prevent default
    e.preventDefault();

    // Get value type
    const type = typeDeleteRestoreMulti.value;

    // Check type
    if (type == "") {
        alert("Please select the type to delete or restore product");
    } else if (inputDeleteRestoreMulti.value == "") {
        alert("Please select the product to delete or restore");
    } else {
        // Check type delete
        let isConfirm = false;
        isConfirm =
            type == "delete-forever"
                ? confirm("Are you sure you want to delete this product?")
                : confirm("Are you sure you want to restore this product?");
        if (isConfirm) {
            formDeleteRestoreMultiProduct.submit();
        }
    }
});

// End handle delete - restore multi products

// Handle delete - forever product
const formDeleteForeverProduct = document.getElementById("form-delete-forever-product");
const buttonDeleteForeverProduct = document.querySelectorAll("button[button-delete-forever]");

// Handle click button delete forever
buttonDeleteForeverProduct.forEach((button) => {
    button.addEventListener("click", () => {
        // Get id product
        const id = button.getAttribute("data-id");

        // Confirm delete product
        const isConfirm = confirm("Are you sure you want to delete this product?");

        // Check confirm
        if (isConfirm) {
            // Get data path
            const path = formDeleteForeverProduct.getAttribute("data-path");
            const action = path + `/${id}?_method=DELETE`;

            // Set action form
            formDeleteForeverProduct.setAttribute("action", action);

            // Submit form
            formDeleteForeverProduct.submit();
        }
    });
});

// End handle delete - forever product

// Handle restore product
const formRestoreProduct = document.getElementById("form-restore-product");
const buttonRestoreProduct = document.querySelectorAll("button[button-restore]");

// Handle click button restore
buttonRestoreProduct.forEach((button) => {
    button.addEventListener("click", () => {
        // Get id product
        const id = button.getAttribute("data-id");

        // Confirm restore product
        const isConfirm = confirm("Are you sure you want to restore this product?");

        // Check confirm
        if (isConfirm) {
            // Get data path
            const path = formRestoreProduct.getAttribute("data-path");
            const action = path + `/${id}?_method=PATCH`;

            // Set action form
            formRestoreProduct.setAttribute("action", action);

            // Submit form
            formRestoreProduct.submit();
        }
    });
});

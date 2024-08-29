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

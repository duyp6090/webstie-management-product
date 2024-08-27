// Handle delete - forever category
const formDeleteCategory = document.getElementById("form-delete-forever-role");
const buttonDeleteCategory = document.querySelectorAll("button[button-delete-forever]");

// Handle click button delete forever
buttonDeleteCategory.forEach((button) => {
    button.addEventListener("click", () => {
        // Get id role
        const id = button.getAttribute("data-id");

        // Confirm delete role
        const isConfirm = confirm("Are you sure you want to delete this product?");

        // Check confirm
        if (isConfirm) {
            // Get data path
            const path = formDeleteCategory.getAttribute("data-path");
            const action = path + `/${id}?_method=DELETE`;

            // Set action form
            formDeleteCategory.setAttribute("action", action);

            // Submit form
            formDeleteCategory.submit();
        }
    });
});

// End handle delete - forever category

// Handle restore category
const formRestoreCategory = document.getElementById("form-restore-role");
const buttonRestoreCategory = document.querySelectorAll("button[button-restore]");

// Handle click button restore
buttonRestoreCategory.forEach((button) => {
    button.addEventListener("click", () => {
        // Get id role
        const id = button.getAttribute("data-id");

        // Confirm restore role
        const isConfirm = confirm("Are you sure you want to restore this product?");

        // Check confirm
        if (isConfirm) {
            // Get data path
            const path = formRestoreCategory.getAttribute("data-path");
            const action = path + `/${id}?_method=PATCH`;

            // Set action form
            formRestoreCategory.setAttribute("action", action);

            // Submit form
            formRestoreCategory.submit();
        }
    });
});

// End handle restore category

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

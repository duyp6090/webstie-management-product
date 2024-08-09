// Process onclick event of the button
const buttonStatus = document.querySelectorAll("[button-status]");

// Define current url
let url = new URL(window.location.href);

// Loop through each button
buttonStatus.forEach((button) => {
    // Add event listener to each button
    button.addEventListener("click", () => {
        // Get the status of the button
        const status = button.getAttribute("button-status");

        // Add class active to the button
        button.classList.add("active");

        // If status is not empty
        if (status) {
            url.searchParams.set("status", status);
        } else url.searchParams.delete("status");

        // Re-set location
        window.location.href = url.href;
    });
});

// End event process of the click on button

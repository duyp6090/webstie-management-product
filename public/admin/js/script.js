// Process onclick event of the button status
const buttonStatus = document.querySelectorAll("[button-status]");

// Define current url
let url = new URL(window.location.href);

// Loop through each button
buttonStatus.forEach((button) => {
    // Add event listener to each button
    button.addEventListener("click", () => {
        // Get the status of the button
        const status = button.getAttribute("button-status");

        // If status is not empty
        if (status) {
            url.searchParams.set("status", status);
        } else url.searchParams.delete("status");

        // Re-set location
        window.location.href = url.href;
    });
});

// End event process of the click on button status

// Form search
const formSearch = document.querySelector("#search-form");

// Add event listener to form search
formSearch.addEventListener("submit", (e) => {
    // Prevent default action
    e.preventDefault();

    // Get the value of the search input
    const keySearch = formSearch.querySelector("input[name='search']").value;

    // If search is not empty
    if (keySearch) {
        url.searchParams.set("search", keySearch);
    } else url.searchParams.delete("search");

    // Re-set location
    window.location.href = url.href;
});

// End form search

// Pagination
const paginations = document.querySelectorAll("[button-pagination]");

// Loop through each pagination
paginations.forEach((pagination) => {
    // Add event listener to each pagination
    pagination.addEventListener("click", () => {
        // Get page number
        const pageNumber = pagination.getAttribute("button-pagination");

        // Re-set url page
        if (pageNumber != "1") url.searchParams.set("page", pageNumber);
        else url.searchParams.delete("page");

        // Re-load url website
        window.location.href = url.href;
    });
});

// End event pagination

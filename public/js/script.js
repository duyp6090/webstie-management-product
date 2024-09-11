// // Get oject url
// let url = new URL(window.location.href);

// // Form search
// const formSearch = document.querySelector("#search-form");

// // Check searchform
// if (formSearch) {
//     // Add event listener to form search
//     formSearch.addEventListener("submit", (e) => {
//         // Prevent default action
//         e.preventDefault();

//         // Get the value of the search input
//         const keySearch = formSearch.querySelector("input[name='search']").value;

//         console.log(keySearch);

//         // If search is not empty
//         if (keySearch) {
//             url.searchParams.set("search", keySearch);
//         } else url.searchParams.delete("search");

//         // Re-set location
//         window.location.href = url.href;
//     });
// }

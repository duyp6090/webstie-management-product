// Define current url
let url = new URL(window.location.href);

// Process onclick event of the button status
const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus) {
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
}
// End event process of the click on button status

// Form search
const formSearch = document.querySelector("#search-form");

if (formSearch) {
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
}

// End form search

// Pagination
const paginations = document.querySelectorAll("[button-pagination]");

if (paginations) {
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
}

// End event pagination

// Preview image
const uploadImages = document.querySelectorAll(".upload-image");

if (uploadImages) {
    // loop through each upload image
    uploadImages.forEach((uploadImage) => {
        // Get input file
        const uploadImageInput = uploadImage.querySelector("input[type='file']");

        // Get image preview
        const imagePreview = uploadImage.querySelector("img");

        // Add event change to each upload image
        uploadImageInput.addEventListener("change", (e) => {
            const file = e.target.files[0];

            // Check if file is not empty
            if (file) {
                imagePreview.src = URL.createObjectURL(file);
            }
        });
    });
}

// End preview image

// Validate form create and update information products

// Function to get parent element of input and tag's error message
function getParentElement(inputElement, selector) {
    // Loop until find parent element
    while (inputElement.parentElement) {
        if (inputElement.parentElement.classList.contains(selector)) {
            return inputElement.parentElement;
        }
        inputElement = inputElement.parentElement;
    }
}

// Function handle validate form
function valiate(inputElement, rule) {
    // Invalid variable
    let error = false;

    // Get value of input
    let valueInput = inputElement.value;

    // Check error message
    let errorMessage = rule.test(valueInput);

    // Get parent element of input
    let parentInputElement = getParentElement(inputElement, "form-group");

    // Get error message's tag
    let errorElement = parentInputElement.querySelector(".error-message");

    // Check type of error message
    if (errorMessage) {
        // Assign error message to error message's tag
        errorElement.innerText = errorMessage;

        // Add class invalid to parent element of input
        parentInputElement.classList.add("invalid");

        // Assign true to error
        error = true;
    } else {
        // Assign empty to error message's tag
        errorElement.innerText = "";

        // Remove class invalid to parent element of input
        parentInputElement.classList.remove("invalid");
    }
    return error;
}

// Define function ValidatorForm
function ValidatorForm(options) {
    // variable form error
    let errorForm = false;
    // Get form element
    const formElement = document.querySelector(options.form);

    console.log(formElement);

    // Check get success form
    if (formElement) {
        // Object to save rules of input
        rulesInput = {};

        // Loop through each rule
        options.rules.forEach((rule) => {
            // Save rule for respective input
            if (!Array.isArray(rulesInput[rule.selector])) {
                rulesInput[rule.selector] = [rule];
            } else {
                rulesInput[rule.selector].push(rule);
            }
        });

        console.log(rulesInput);

        // Loop through each input element of form
        for (let selector in rulesInput) {
            // Get input element of form
            let inputElement = formElement.querySelector(selector);

            // Handle when blur out of input
            inputElement.onblur = function () {
                // Loop through each rule of input
                for (let rule of rulesInput[selector]) {
                    error = valiate(inputElement, rule);
                    // Stop when error
                    if (error) {
                        // Assign true to error form
                        errorForm = error;
                        // Stop loop
                        break;
                    }
                }
            };

            // Handle when onInput
            inputElement.oninput = function () {
                // Get parent element of input
                let parentInputElement = getParentElement(inputElement, "form-group");

                // Get error message's tag
                let errorElement = parentInputElement.querySelector(".error-message");

                // Assign empty to error message's tag
                errorElement.innerText = "";

                // Remove class invalid to parent element of input
                parentInputElement.classList.remove("invalid");
            };
        }
    }
    return errorForm;
}

// Define Rules
ValidatorForm.isRequire = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() !== "" ? undefined : "Vui lòng nhập trường này";
        },
    };
};

ValidatorForm.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
        },
    };
};

ValidatorForm.isDigit = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            // convert value to digit
            value = parseInt(value);
            return value ? undefined : "Vui lòng nhập số";
        },
    };
};

ValidatorForm.minValue = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value >= min ? undefined : `Vui lòng nhập số lớn hơn hoặc bằng ${min}`;
        },
    };
};

// Get form create and update information products
const formCreateProduct = document.querySelector("#form-create-product");
const formUpdateProduct = document.querySelector("#form-updated-product");

// Object validate all form
const validateForm = {
    rules: [
        ValidatorForm.isRequire("#title"),
        ValidatorForm.isRequire("#price"),
        ValidatorForm.isDigit("#price"),
        ValidatorForm.minValue("#price", 0),
    ],
};

if (formCreateProduct || formUpdateProduct) {
    const form = formCreateProduct ? formCreateProduct : formUpdateProduct;
    const idForm = formCreateProduct ? "#form-create-product" : "#form-updated-product";

    // Save object validate all form
    validateForm.form = idForm;

    // Call function validatorForm
    ValidatorForm(validateForm);

    form.addEventListener("submit", (e) => {
        // Block Submit Form
        e.preventDefault();

        // Call function validate form
        let error = ValidatorForm(validateForm);

        // Check error
        if (!error) {
            form.submit();
        }
    });
}

// End validate form create and update information products

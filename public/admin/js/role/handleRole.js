// Get button submit authorization
const btnSubmit = document.querySelector("button[button-submit-authorization]");

// Check if button submit authorization exists
if (btnSubmit) {
    // Get list id role
    const listIdrole = document.querySelectorAll("th[data-idRole]");

    // Handle submit authorization
    btnSubmit.onclick = function () {
        // Create list authorization with role
        let listAuthorizationByIdRole = [];

        // Loop through all id role
        listIdrole.forEach((idRole, index) => {
            // Create object authorization
            let objectAuthorization = {};

            // Push id role to object
            objectAuthorization["id"] = idRole.getAttribute("data-idRole");

            // Get row checkbox authorization
            const rowCheckboxByIdRole = document.querySelectorAll("tr[data-name]");

            // Loop row checkbox authorization
            rowCheckboxByIdRole.forEach((row) => {
                // Get type and name authorization
                const [nameAuthorization, typeAuthorization] = row
                    .getAttribute("data-name")
                    .split("-");

                // Get children input checkbox respectively
                const inputCheckBox = row.children[index + 1].querySelector("input");

                // Check if input is checked
                if (inputCheckBox.checked) {
                    // Push type authorization to object
                    if (!objectAuthorization[nameAuthorization]) {
                        objectAuthorization[nameAuthorization] = [typeAuthorization];
                        console.log(objectAuthorization);
                    } else {
                        objectAuthorization[nameAuthorization].push(typeAuthorization);
                    }
                }
            });
            // Push object authorization to list
            listAuthorizationByIdRole.push(objectAuthorization);
        });

        // Check list authorization not empty
        if (listAuthorizationByIdRole.length > 0) {
            // Get form change authorization
            const formChangeAuthorization = document.querySelector("#form-change-authorization");

            // Check if form change authorization exists
            if (formChangeAuthorization) {
                // Get input hidden authorization
                const inputAuthorization = document.querySelector("input[name=permissions]");

                // Assign value to input hidden authorization
                inputAuthorization.value = JSON.stringify(listAuthorizationByIdRole);

                console.log(inputAuthorization.value);

                // Submit form change authorization
                formChangeAuthorization.submit();
            }
        }
    };
}

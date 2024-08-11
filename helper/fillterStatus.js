function fillterStatus(query) {
    // Fillter status
    let fillterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: "active",
        },

        {
            name: "Hoạt động",
            status: "active",
            class: "",
        },

        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: "",
        },
    ];

    // Status Find
    let statusFind = query.status;

    // If status is undefined
    if (statusFind == undefined) statusFind = "";

    // Update Class active Fillter
    fillterStatus.forEach((fillItem) => {
        if (fillItem.status == statusFind) {
            fillItem.class = "active";
        } else fillItem.class = "";
    });

    return fillterStatus;
}

module.exports = fillterStatus;

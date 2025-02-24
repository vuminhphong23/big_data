document.addEventListener("DOMContentLoaded", function () {
    let ratingChartInstance, accountChartInstance, locationChartInstance, deviceChartInstance, keywordChartInstance;

    // Fetch dữ liệu cho bảng và biểu đồ rating
    function fetchRatingData() {
        fetch("/data/rating")
            .then((response) => response.json())
            .then((ratingData) => {
                const tableBody = document.querySelector("#data-table tbody");
                let movieNames = [];
                let ratings = [];
                tableBody.innerHTML = "";  

                ratingData.forEach((item) => {
                    const row = `<tr>
                        <td>${item.movie_name}</td>
                        <td>${item.rating}</td>
                        <td>${item.account_type || "N/A"}</td>
                        <td>${item.location || "N/A"}</td>
                        <td>${item.device || "N/A"}</td>
                        <td>${item.keyword || "N/A"}</td>
                    </tr>`;
                    tableBody.innerHTML += row;

                    movieNames.push(item.movie_name);
                    ratings.push(item.rating);
                });

                // Update biểu đồ rating
                if (ratingChartInstance) ratingChartInstance.destroy(); 
                ratingChartInstance = new Chart(document.getElementById("ratingChart"), {
                    type: "bar",
                    data: {
                        labels: movieNames,
                        datasets: [
                            {
                                label: "Movie Ratings",
                                data: ratings,
                                backgroundColor: "#4CAF50",
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Movie Ratings",
                                font: { size: 18 },
                            },
                        },
                    },
                });
            });
    }

    // Fetch dữ liệu cho các biểu đồ khác
    function fetchAllData() {
        fetch("/data/all")
            .then((response) => response.json())
            .then((allData) => {
                let accountCounts = {};
                let locationCounts = {};
                let deviceCounts = {};
                let keywordCounts = {};

                allData.forEach((item) => {
                    accountCounts[item.account_type] = (accountCounts[item.account_type] || 0) + 1;
                    locationCounts[item.location] = (locationCounts[item.location] || 0) + 1;
                    deviceCounts[item.device] = (deviceCounts[item.device] || 0) + 1;
                    keywordCounts[item.keyword] = (keywordCounts[item.keyword] || 0) + 1;
                });

                // Update biểu đồ Account Type (Pie Chart)
                if (accountChartInstance) accountChartInstance.destroy();
                accountChartInstance = new Chart(document.getElementById("accountChart"), {
                    type: "pie",
                    data: {
                        labels: Object.keys(accountCounts),
                        datasets: [
                            {
                                label: "Account Type",
                                data: Object.values(accountCounts),
                                backgroundColor: ["#FF6B6B", "#FFCC00", "#3498DB", "#8E44AD"],
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Account Type",
                                font: { size: 18 },
                            },
                            legend: {
                                display: true,
                                position: "bottom",
                            },
                        },
                    },
                });

                // Update biểu đồ Location (Doughnut Chart)
                if (locationChartInstance) locationChartInstance.destroy();
                locationChartInstance = new Chart(document.getElementById("locationChart"), {
                    type: "doughnut",
                    data: {
                        labels: Object.keys(locationCounts),
                        datasets: [
                            {
                                label: "Location",
                                data: Object.values(locationCounts),
                                backgroundColor: ["#8E44AD", "#1ABC9C", "#E74C3C", "#3498DB"],
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Location",
                                font: { size: 18 },
                            },
                            legend: {
                                display: true,
                                position: "bottom",
                            },
                        },
                    },
                });

                // Update biểu đồ Device (Bar Chart)
                if (deviceChartInstance) deviceChartInstance.destroy();
                deviceChartInstance = new Chart(document.getElementById("deviceChart"), {
                    type: "bar",
                    data: {
                        labels: Object.keys(deviceCounts),
                        datasets: [
                            {
                                label: "Device Usage",
                                data: Object.values(deviceCounts),
                                backgroundColor: ["#F39C12", "#8E44AD", "#2ECC71", "#3498DB"],
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Device Usage",
                                font: { size: 18 },
                            },
                            legend: {
                                display: false,
                            },
                        },
                    },
                });

                // Update biểu đồ Keyword (Horizontal Bar Chart)
                if (keywordChartInstance) keywordChartInstance.destroy();
                keywordChartInstance = new Chart(document.getElementById("keywordChart"), {
                    type: "bar",
                    data: {
                        labels: Object.keys(keywordCounts),
                        datasets: [
                            {
                                label: "Keyword Frequency",
                                data: Object.values(keywordCounts),
                                backgroundColor: ["#E74C3C", "#3498DB", "#2ECC71", "#FFCC00"],
                            },
                        ],
                    },
                    options: {
                        indexAxis: "y", 
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Keyword Frequency",
                                font: { size: 18 },
                            },
                            legend: {
                                display: false,
                            },
                        },
                    },
                });
            });
    }

    // Initial fetch
    fetchRatingData();
    fetchAllData();

    // Cập nhật dữ liệu theo thời gian 
    setInterval(() => {
        fetchRatingData();
        fetchAllData();
    }, 20000); 
});

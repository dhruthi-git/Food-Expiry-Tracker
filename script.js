alert("JavaScript Connected");
let foodItems = JSON.parse(localStorage.getItem("foodItems")) || [];

    items.forEach(item => {
        const today = new Date();
        const expiry = new Date(item.expiry);

        const timeDiff = expiry - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        let statusClass = "safe";
        let statusText = "Safe";

        if (daysLeft < 0) {
            statusClass = "expired";
            statusText = "Expired";
        } else if (daysLeft <= 3) {
            statusClass = "expiring";
            statusText = "Expiring Soon";
        }

        const foodDiv = document.createElement("div");
        foodDiv.classList.add("food-item", statusClass);

        foodDiv.innerHTML = `
            <div class="food-details">
                <h3>${item.name}</h3>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Expiry Date:</strong> ${item.expiry}</p>
                <p><strong>Status:</strong> ${statusText}</p>
            </div>

            <button class="delete-btn" onclick="deleteFoodItem(${item.id})">
                Delete
            </button>
        `;

        foodList.appendChild(foodDiv);
    });


function checkExpiryNotifications() {
    foodItems.forEach(item => {
        const today = new Date();
        const expiry = new Date(item.expiry);

        const timeDiff = expiry - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysLeft === 1) {
            console.log(`${item.name} expires tomorrow!`);
        }
    });
}

window.onload = displayFoodItems;
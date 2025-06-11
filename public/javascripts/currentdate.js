

document.addEventListener("DOMContentLoaded", function () {
  // Simulate fetching order data from the backend
  axios.get('/orders/list') // Adjust this endpoint to your actual API
    .then(response => {
      const orderId = response.data.orderId;
      const orderDate = new Date().toLocaleString(); // Current date & time

      document.getElementById('orderId').textContent = orderId;
      document.getElementById('orderDateTime').textContent = orderDate;
    })
    .catch(error => {
      console.error("Failed to load order data:", error);
    });
});


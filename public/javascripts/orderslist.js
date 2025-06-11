// public/javascripts/orderlist.js

// document.addEventListener("DOMContentLoaded", () => {
//   const ordersContainer = document.getElementById("ordersContainer");

//   axios.get('/orders/list')  
//     .then(response => {
//       const orders = response.data;

//       if (!orders || orders.length === 0) {
//         ordersContainer.innerHTML = "<p>No orders found.</p>";
//         return;
//       }

//       let html = '';
//       orders.forEach((order, index) => {
//         html += `
//           <div class="accordion-item">
//             <h2 class="accordion-header" id="heading${index}">
//               <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">
//                 Order #${order.id} - ₹${order.total}
//               </button>
//             </h2>
//             <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#ordersContainer">
//               <div class="accordion-body">
//                 <p><strong>Date:</strong> ${order.date}</p>
//                 <p><strong>Items:</strong></p>
//                 <ul>
//                   ${order.items.map(item => `<li>${item.name} (x${item.quantity})</li>`).join('')}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         `;
//       });

//       ordersContainer.innerHTML = html;
//     })
//     .catch(err => {
//       console.error("Error loading orders", err);
//       ordersContainer.innerHTML = "<p class='text-danger'>Failed to load order data.</p>";
//     });
// });





document.addEventListener("DOMContentLoaded", () => {
  axios.get('/orders/list')
    .then(response => {
      const orders = response.data.orders;
      const container = document.getElementById("ordersContainer");

      if (Array.isArray(orders) && orders.length > 0) {
        orders.forEach(order => {
          const orderBox = document.createElement("div");
          orderBox.className = "order-box";

          // Format each cart item into a readable line
          const items = order.cartItems.map(item =>
            `<div class="item-line">- ${item.title} - ₹${item.price.toFixed(2)} × ${item.quantity}</div>`
          ).join("");

          // Append order data into the box
          orderBox.innerHTML = `
            <div class="order-header">Order #${order.orderId}</div>
            <div class="order-meta">Date: ${order.orderDate}</div>
            <div class="order-meta">Total Amount: ₹${order.totalAmount}</div>
            <div class="items-list">${items}</div>
          `;

          container.appendChild(orderBox);
        });
      } else {
        container.innerHTML = "<div class='alert alert-warning'>No orders found.</div>";
      }
    })
    .catch(error => {
      console.error("Error fetching orders:", error);
      document.getElementById("ordersContainer").innerHTML =
        "<div class='alert alert-danger'>Unable to load orders. Please try again later.</div>";
    });
});


function logoutUser() {
  localStorage.clear();
  window.location.href = "index.html"; // Adjust if needed
}

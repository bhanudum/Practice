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
          const totalQty = order.cartItems.reduce((sum, item) => sum + item.quantity, 0);
          const rawDate = new Date(order.orderDate);
          const formattedDate = `${rawDate.getDate().toString().padStart(2, '0')}-${(rawDate.getMonth() + 1).toString().padStart(2, '0')}-${rawDate.getFullYear()} ${rawDate.getHours().toString().padStart(2, '0')}:${rawDate.getMinutes().toString().padStart(2, '0')}`;


          // Build table rows for each item
          const itemsRows = order.cartItems.map((item, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${item.title}</td>
              <td>${item.quantity}</td>
              <td>₹${item.price.toFixed(2)}</td>
              <td>₹${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          `).join("");

          // Full HTML structure with table and summary
          orderBox.innerHTML = `
            <div class="d-flex justify-content-between mb-2">
              <div class="order-header fs-5 text-primary fw-bold">Order Id: ${order.orderId}</div>
              <div class="order-meta text-muted fw-bold">Date: ${formattedDate}</div>
            </div>

            <div class="table-responsive">
              <table class="table table-bordered table-sm">
                <thead class="table-light">
                  <tr>
                    <th>S.No</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-between align-items-start mt-3 flex-wrap">
              <div class="summary text-start">
                <div><strong>Total No of Products:</strong> ${order.cartItems.length}</div>
                <div><strong>Total Quantity:</strong> ${totalQty}</div>
                <div><strong>Total Amount:</strong> ₹${order.totalAmount}</div>
              </div>

              <div class="download text-end mt-3 mt-md-0">
                <button class="btn btn-outline-primary" onclick="window.location.href='downloadinvoice.html?orderId=${order.orderId}'">Download Invoice</button>
              </div>
            </div>
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

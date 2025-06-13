
document.addEventListener("DOMContentLoaded", () => {
  let allOrders = [];
  const today = new Date().toISOString().split("T")[0];
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  if (startDateInput) startDateInput.max = today;
  if (endDateInput) endDateInput.max = today;

  axios.get('/orders/list')
    .then(response => {
      allOrders = response.data.orders || [];
      renderOrders(allOrders);

      const orderIdInput = document.getElementById("orderIdSearch");
      if (orderIdInput) {
        orderIdInput.addEventListener("input", function () {
          const searchTerm = this.value.trim().toLowerCase();
          const filteredOrders = allOrders.filter(order =>
            order.orderId.toLowerCase().includes(searchTerm)
          );
          renderOrders(filteredOrders);
        });
      }

       if (startDateInput && endDateInput) {
        startDateInput.addEventListener("change", filterByDateRange);
        endDateInput.addEventListener("change", filterByDateRange);
      }
      
        function filterByDateRange() {
        const start = new Date(startDateInput.value);
        const end = new Date(endDateInput.value);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999); 
        if (isNaN(start) || isNaN(end)) return;

        const filtered = allOrders.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= start && orderDate <= end;
        });

        renderOrders(filtered);
      }


    })
    .catch(error => {
      console.error("Error fetching orders:", error);
      document.getElementById("ordersContainer").innerHTML =
        "<div class='alert alert-danger'>Unable to load orders. Please try again later.</div>";
    });
});

function renderOrders(orders) {
  const container = document.getElementById("ordersContainer");
  container.innerHTML = "";

  const countDiv = document.getElementById("orderCount");
  if (countDiv) {
    countDiv.innerHTML = `Total No of Orders: ${orders.length}`;
  }
  if (Array.isArray(orders) && orders.length > 0) {
    orders.forEach(order => {
      const orderBox = document.createElement("div");
      orderBox.className = "order-box";

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
      const header = document.createElement("div");
      header.className = "d-flex justify-content-between mb-2 order-toggle-header cursor-pointer";
      header.innerHTML = `
            <div class="order-header fs-5 text-primary fw-bold">Order Id: ${order.orderId}</div>
            <div class="order-meta text-muted fw-bold">Order Date: ${formattedDate}</div>
            <div><strong>Total Amount:</strong> ₹${order.totalAmount}</div>

                <i class="fa-solid fa-chevron-down rotate-icon"></i>
          `;

      const collapsibleContent = document.createElement("div");
      collapsibleContent.className = "collapsible-content";
      collapsibleContent.innerHTML = `

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
      header.style.cursor = 'pointer';
      collapsibleContent.style.display = 'none';
      const chevron = header.querySelector(".rotate-icon");
      header.onclick = () => {

        // collapsibleContent.style.display = (collapsibleContent.style.display === 'none') ? 'block' : 'none';
        const isVisible = collapsibleContent.style.display === 'block';
        collapsibleContent.style.display = isVisible ? 'none' : 'block';
        chevron.classList.toggle("rotate-180", !isVisible);
      };

      orderBox.appendChild(header);
      orderBox.appendChild(collapsibleContent);
      container.appendChild(orderBox);


    });




  } else {
    container.innerHTML = "<div class='alert alert-warning'>No orders found.</div>";
  }
}




function logoutUser() {
  localStorage.clear();
  window.location.href = "index.html"; // Adjust if needed
}

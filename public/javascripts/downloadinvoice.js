document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");

  axios.get('orders/list')
    .then(response => {
      const orders = response.data.orders;
      const order = orders.find(o => o.orderId === orderId);

      if (!order) {
        document.body.innerHTML = "<h3>Order not found</h3>";
        return;
      }

      generateAndDownloadPDF(order);
    })
    .catch(err => {
      console.error(err);
      document.body.innerHTML = "<h3>Error loading order</h3>";
    });
});

function generateAndDownloadPDF(order) {
  const content = `
    <div style="font-family: Arial;">
      <h2>Invoice - Order #${order.orderId}</h2>
      <p><strong>Date:</strong> ${order.orderDate}</p>
      <hr/>
      <table style="width: 100%; border-collapse: collapse;" border="1">
        <thead>
          <tr>
            <th style="padding: 5px;">Title</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.cartItems.map(item => `
            <tr>
              <td style="padding: 5px;">${item.title}</td>
              <td>₹${item.price.toFixed(2)}</td>
              <td>${item.quantity}</td>
              <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <h3 style="text-align: right;">Total Amount: ₹${order.totalAmount}</h3>
    </div>
  `;

  const opt = {
    margin: 0.5,
    filename: `Invoice_Order_${order.orderId}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(content).set(opt).save();
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");
  const accountId = sessionStorage.getItem("accountId");

  if (!accountId || !orderId) {
    document.body.innerHTML = "<h3>Missing user or order info</h3>";
    return;
  }

  axios.get(`/orders/list?accountId=${encodeURIComponent(accountId)}`)
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
  <div style="font-family: Arial; padding: 20px;">
    <h1 style="text-align: center; color:rgb(230, 62, 11); margin-bottom: 5px;">ShopInHand</h1>
  
    <p style="text-align: center; margin: 0;">Bringing Stores to Your Fingertips.  Your One-Stop Shop for Everything!</p>
   
    </br>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <h4 style="margin: 0;">Invoice - Order #${order.orderId}</h4>
      <h4 style="margin: 0;">Date: ${order.orderDate}</h4>
    </div>

    <hr style="margin: 10px 0;" />
   
    
    <div style="margin-bottom: 15px;">
      <strong>Customer Details : </strong>
      <div><strong>Name:</strong> ${order.user?.accountId || 'N/A'}</div>
      <div><strong>Email:</strong> ${order.user?.email || 'N/A'}</div>
      <div><strong>Mobile:</strong> ${order.user?.mobile || 'N/A'}</div>
      <div><strong>Address:</strong> ${order.user?.address || 'N/A'}</div>
    </div>

    <table style="width: 100%; border-collapse: collapse;" border="1">
      <thead style="background-color:rgb(193, 206, 119);">
        <tr>
          <th style="padding: 8px;">S.No</th>
          <th style="padding: 8px;">Title</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${order.cartItems.map((item, index) => `
          <tr>
            <td style="text-align: center;">${index + 1}</td>
            <td style="padding: 5px;">${item.title}</td>
            <td style="text-align: center;">₹${item.price.toFixed(2)}</td>
            <td style="text-align: center;">${item.quantity}</td>
            <td style="text-align: center;">₹${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <h3 style="text-align: right; margin-top: 15px;">Total Amount: ₹${order.totalAmount}</h3>
  
    <p style="text-align: right; margin-top: 5px; color: #888;">
  This is a computer-generated invoice and does not require a signature.
</p>
    <p style="text-align: right; margin-top: 5px;">.........................................................................................................................................................................................................</p>

    

    <footer style="text-align: center; margin-top: 25px; font-size: 0.9rem; color: #555;">
      <p style="margin: 4px;">Thank you for shopping with us!</p>
      <p style="margin: 4px;">Connecting Buyers and Sellers, One Click at a Time! Discover Deals, Find Needs — All at Your Fingertips.</p>
      <p style="margin: 4px;">Contact: +91-1234567890 | Email: <a href="mailto:support@shopinhand.com">support@shopinhand.com</a></p>
      <p style="margin: 4px;">Visit us at: <a href="https://www.shopinhand.com" target="_blank">www.shopinhand.com</a></p>
    </footer>
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

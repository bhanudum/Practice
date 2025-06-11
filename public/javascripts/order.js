function placeOrder() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const orderPayload = {
    cartItems,
    totalAmount
  };

  axios.post('/order/placed', orderPayload)
    .then(response => {
      if (response.data.msg === 'success') {
        alert(`✅ Order placed successfully! Your Order ID is ${response.data.orderId}`);
        localStorage.removeItem('cart');
        renderCart(); 
        //clearCart(); // Clear cart items from UI
        window.location.href = 'orderslist.html'; // Refresh cart UI
      } else {
        alert("❌ Order failed. Please try again.");
      }
    })
    .catch(error => {
      console.error("Order placement error:", error);
      alert("⚠️ An error occurred while placing the order.");
    });
}
    
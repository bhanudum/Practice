
function profile() {
    {
  const sidebar = document.getElementById("profileSidebar");
  const isHidden = sidebar.classList.contains("d-none");
  sidebar.classList.toggle("d-none", !isHidden);

  if (isHidden) {
    document.getElementById("userName").textContent = localStorage.getItem('user_name') || "N/A";
    document.getElementById("userEmail").textContent = localStorage.getItem('user_email') || "N/A";
    document.getElementById("userMobile").textContent = localStorage.getItem('user_mobile') || "N/A";
    document.getElementById("userAddress").textContent = localStorage.getItem('user_address') || "N/A";
  }
}

function viewOrders() {
  window.location.href = "orderslist.html";
}

function viewAddress() {
  window.location.href = "address.html";
}



}
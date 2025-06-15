
function profile() {
  const sidebar = document.getElementById("profileSidebar");
  const isHidden = sidebar.classList.contains("d-none");

  // Toggle visibility
  sidebar.classList.toggle("d-none", !isHidden);

  // Load user data only when showing the profile
  if (isHidden) {
   document.getElementById('userName').textContent = sessionStorage.getItem('accountId') || 'N/A';
    document.getElementById('userEmail').textContent = sessionStorage.getItem('userEmail') || 'N/A';
    document.getElementById('userMobile').textContent = sessionStorage.getItem('userMobile') || 'N/A';
    document.getElementById('userAddress').textContent = sessionStorage.getItem('userAddress') || 'N/A';
    document.getElementById('userDOB').textContent = sessionStorage.getItem('userDOB') || 'N/A';
    document.getElementById('userId').textContent = sessionStorage.getItem('userId') || 'N/A';
  }
}

function viewOrders() {
  window.location.href = "orderslist.html";
}

function viewAddress() {
  window.location.href = "address.html";
}




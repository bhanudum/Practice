var logoutUser = () => {
    axios.get("/destroy/userSession").then(() => {
        loadSeletedPage('onload');
        sessionStorage.clear();
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('accountId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userMobile');
        localStorage.removeItem('userDOB');
        localStorage.removeItem('userAddress');
        localStorage.removeItem('accountId'); // if used for remember me
        localStorage.removeItem('password');
         localStorage.clear();
  window.location.href = "index.html#onload";

    }).catch(err => {
        
    });
};


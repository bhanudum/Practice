

var validateUserCredentials = () => {
    var userData = {};
    userData.accountId = $("#userAccountId").val();
    userData.password = $("#accountPassword").val();


    axios.post('/validate/user/credentials', userData).then((result) => {
        console.log("success");
        console.log(result);
        console.log(result.data);
        if (result.data.status == 'Invalid') {
            $("#statusMsg").text('Invalid Credentials, please try again...');
        } else {
            jwtToken = result.data.token;
            sessionStorage.setItem('jwtToken', jwtToken);
            $("#statusMsg").text('Login successful, redirecting to product details...');
            
            const user = result.data.user;
    if (user) {
        sessionStorage.setItem('#userName', user.userId);
        sessionStorage.setItem('accountId', user.accountId);
        sessionStorage.setItem('userEmail', user.email);
        sessionStorage.setItem('userMobile', user.mobile);
        sessionStorage.setItem('userDOB', user.dob);
        sessionStorage.setItem('userAddress', user.address);
    }



            if (userData.rememberMe) {
                localStorage.setItem('accountId', userData.accountId);
                localStorage.setItem('password', userData.password);
            } else {
                localStorage.removeItem('accountId');
                localStorage.removeItem('password');
            }
            loginModal.hide();
            document.querySelector('.loggedinUser').classList.remove('d-none');
            document.querySelector('.newUser').classList.add('d-none');
            loadSeletedPage('productDetails')
        }
    }).catch((err) => {
        console.log(error.response); 
            console.log(error.code); 


    });
    // console.log(userData);

    console.log({ accountId: userData.accountId, password: '***' });
}

var showSignupModal = () => {
    loginModal.hide();
    signupModal.show();
}
var loginModal, signupModal;

document.addEventListener("DOMContentLoaded", () => {
    loginModal = new bootstrap.Modal(document.querySelector('#loginModal'), {});

    signupModal = new bootstrap.Modal(document.querySelector('#signupModal'), {});



    // Autofill credentials if present
    if (localStorage.getItem('accountId')) {
        $('#userAccountId').val(localStorage.getItem('accountId'));
        $('#accountPassword').val(localStorage.getItem('password'));
        $('#rememberMeCheckbox').prop('checked', true);
    }

})


axios.get('/check/userLoggedin').then((response) => {
    const isLoggedIn = response.data.isLoggedin === true;

    if (isLoggedIn) {
        document.querySelector('.loggedinUser').classList.remove('d-none');
        document.querySelector('.newUser').classList.add('d-none');
        loadSeletedPage('productDetails');
    } else {
        document.querySelector('.loggedinUser').classList.add('d-none');
        document.querySelector('.newUser').classList.remove('d-none');
        loadSeletedPage('onload');
    }
}).catch((err) => {
    console.error('Session check failed:', err);
    document.querySelector('.loggedinUser').classList.add('d-none');
    document.querySelector('.newUser').classList.remove('d-none');
    loadSeletedPage('onload');
});

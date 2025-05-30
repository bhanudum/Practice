
var jwtToken = '';
var validateUserCredentials = () => {
    var userData = {};
    userData.accountId = $("#userAccountId").val();
    userData.password = $("#accountPassword").val();


    axios.post('/validate/user/credentials', userData).then((result) => {
        console.log("success");
        console.log(result);
        if (result.data.status == 'Invalid') {
            $("#statusMsg").text('Invalid Credentials, please try again...');
        } else {
            jwtToken = result.data.token;
            $("#statusMsg").text('Valid credentials, please visit product details.....');
            if (userData.rememberMe) {
                localStorage.setItem('accountId', userData.accountId);
                localStorage.setItem('password', userData.password);
            } else {
                localStorage.removeItem('accountId');
                localStorage.removeItem('password');
            }
            loginModal.hide();
            loadSeletedPage('productDetails')
        }
    }).catch((err) => {

    });
    console.log(userData);
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
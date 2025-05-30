
var resetFormData = () => {
    $("#s_accountId").val('');
    $("#s_password").val('');
    $("#accountMailid").val('');
    $("#s_rpassword").val('');
    $("#s_mobilenumber").val('');
    $("#s_dob").val('');        
    $("#s_address").val('');

    // $("#signupMsg").hide();
    $("#s_accountId").focus();
}

var doUserSignup = () => {
    var userDetails = {};
    userDetails.accountId = $("#s_accountId").val();
    userDetails.password = $("#s_password").val();
    userDetails.mailId = $("#accountMailid").val();
    userDetails.mobileNumber = $("#s_mobilenumber").val();
    userDetails.dob = $("#s_dob").val();
    userDetails.address = $("#s_address").val();
    userDetails.rpassword = $("#s_rpassword").val();

    axios.post('/newUserSignup/register', userDetails).then((result) => {
        $("#signupMsg").show();
        console.log(result);
        if (result.data.msg == 'Done') {
            $("#signupMsg span").text("Signedup Successfly");
            
            resetFormData();
        } else {
            $("#signupMsg span").text("Error while doing signup");
        }
    }).catch((err) => {
        
    });
}
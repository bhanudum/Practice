

document.addEventListener("DOMContentLoaded", () => {
    addCapthcaText();

    axios.get('/check/userLoggedin').then((response) => {
        console.log(response.data);
        if (response.data.isLoggedin === true) {
            loadSeletedPage('productDetails');
        } else {
            loadSeletedPage('onload');
        }
    });
    
    
});

var addCapthcaText = () => {
    var captchaText = generateCaptchaText('LNULN');
    document.querySelector(".captchaBlock").innerText = captchaText;
}

var loadSeletedPage = (pageType) => {
    location.hash = pageType;
    var templateUrl = '';
    if (pageType == 'onload') {
        $(".newUer").show(); 
        $(".loggedinUser").hide();
    } else {
        $(".newUer").hide(); 
        $(".loggedinUser").show();
    }
    switch(pageType) {
        case 'onload':
            templateUrl = 'templates/onload.htm';           
            break;
        case 'productDetails':
            templateUrl = 'templates/productDetails.htm';
            break;
    }
    axios.get(templateUrl).then((response) => {
        $('main').html(response.data);

        if (pageType == 'productDetails') {
            loadProductsToPage();
            fillCategoryListUnderFilter();
        }
    });
}

var logoutUser = () => {
    axios.get("/destroy/userSession").then(() => {
         loadSeletedPage('onload')
    });
    
}
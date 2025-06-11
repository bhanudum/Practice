let captcha = null; // Declare global captcha variable

document.addEventListener("DOMContentLoaded", () => {
    addCaptchaText();

    axios.get('/check/userLoggedin').then((response) => {
        console.log(response.data);
        if (response.data.isLoggedin === true) {
            loadSeletedPage('productDetails');
        } else {
            loadSeletedPage('onload');
        }
    });
});

var addCaptchaText = () => {
    // Make sure this function is available globally or imported
    if (typeof generateCaptchaText === 'function') {
        const captchaText = generateCaptchaText('LNULN');
        document.querySelector(".captchaBlock").innerText = captchaText;

        if (captcha) captcha.innerText = '';
        captcha = document.querySelector(".captchaBlock");
    } else {
        console.error("generateCaptchaText is not defined");
    }
};

var loadSeletedPage = (pageType) => {
    location.hash = pageType;
    let templateUrl = '';

    if (pageType === 'onload') {
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
        default:
            console.warn("Unknown page type:", pageType);
            return;
    }

    axios.get(templateUrl).then((response) => {
        $('main').html(response.data);

        if (pageType === 'productDetails') {
            if (typeof loadProductsToPage === 'function') loadProductsToPage();
            if (typeof fillCategoryListUnderFilter === 'function') fillCategoryListUnderFilter();
        }
    }).catch(err => {
        console.error("Failed to load template:", err);
    });
};

var logoutUser = () => {
    axios.get("/destroy/userSession").then(() => {
        loadSeletedPage('onload');
    }).catch(err => {
        console.error("Logout failed:", err);
    });
};



var singleProductTemplate;

axios.get('templates/singleProductTmplt.htm').then((response) => {
    singleProductTemplate = Handlebars.compile(response.data);
})

var loadProductsToPage = (userQuery = {}) => {
    $("#productDetailsContainer").html('');

    axios.post('/get/productDetails', userQuery, { headers: {"Authorization" : `Bearer ${jwtToken}`} }).then((result) => {
        console.log(result.data);
        var productData = result.data;
        productData.forEach((product, index) => {
            product.title = product.title.substr(0, 50);
            product.description = product.description.substr( 0, 85) + '...';
            product.index = index;
            console.log(product.description);

            $("#productDetailsContainer").append(singleProductTemplate(product));

            var ratingContainer = `#rating_${index}`;
            addRatingStarsToContainer(product.rating.rate, ratingContainer);
        });
    }).catch((err) => {
        
    });
}   
var setPriceRange = () => {
    $("#selectedPrice").text($("#priceRangeBar").val())
}

var applyFilter = () => {
    var userQuery = {};
    userQuery.priceRange = $("#priceRangeBar").val();
    userQuery.categoryList = [];
    var selectedCategory = document.querySelectorAll("#categoryList input:checked");
    selectedCategory.forEach((element) => {
        userQuery.categoryList.push(element.value);
    });
    loadProductsToPage(userQuery);
}

var fillCategoryListUnderFilter = () => {
    var categoryList = [];
    axios.get('/category/list').then((response) => {
        categoryList = response.data;
        categoryList.forEach((category) => {
            var divTag = $("<div/>");
            var checkbox = $('<input type="checkbox" value="' + category + '"/>');
            divTag.text(category).append(checkbox);
            
            $("#categoryList").append(divTag)
        });
    })

    

    console.log($("#categoryList"));
    
}


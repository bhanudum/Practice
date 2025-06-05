var singleProductTemplate;
var allProducts = [];
var jwtToken = sessionStorage.getItem("jwtToken"); 
console.log(jwtToken);// Adjust if you use another method

// Load and compile Handlebars template
axios.get('templates/singleProductTmplt.htm').then((response) => {
    singleProductTemplate = Handlebars.compile(response.data);
});

// Reusable function to render product cards
var renderProducts = (products) => {
    $("#productDetailsContainer").html('');
    console.log(products.length + " products found");
     $("#totalProducts").text(products.length);
     const totalPrice = products.reduce((sum, p) => sum + p.price, 0).toFixed(2);
     $("#totalPrice").text(totalPrice);
    products.forEach((product, index) => {
        product.title = product.title.substr(0, 50);
        product.category=product.category.substr(0, 20);
        product.category = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        product.description = product.description.substr(0, 85) + '...';
        product.index = index;

        $("#productDetailsContainer").append(singleProductTemplate(product));

        var ratingContainer = `#rating_${index}`;
        addRatingStarsToContainer(product.rating.rate, ratingContainer);
    });
};

// Load products from backend
var loadProductsToPage = (userQuery = {}) => {
    $("#productDetailsContainer").html('');

    axios.post('/get/productDetails', userQuery, {headers: { "Authorization": `Bearer ${jwtToken}` }
    }).then((result) => {
        console.log(result.data);
        allProducts = result.data;
        renderProducts(allProducts);
    }).catch((err) => {
        console.error("Failed to load products", err);
    });
};

// Filter: Price range
var setPriceRange = () => {
    $("#selectedPrice").text($("#priceRangeBar").val());
};

// Filter: Category + Price
var applyFilter = () => {
    var userQuery = {};
    userQuery.priceRange = $("#priceRangeBar").val();
    userQuery.categoryList = [];

    var selectedCategory = document.querySelectorAll("#categoryList input:checked");
    selectedCategory.forEach((element) => {
        userQuery.categoryList.push(element.value);
    });

    loadProductsToPage(userQuery);
};

var clearFilter = () => {
    
    // Reset price range to minimum
    $("#priceRangeBar").val(100);
    $("#selectedPrice").text(100);

    // Uncheck all category checkboxes
    $("#categoryList input[type='checkbox']").prop('checked', false);

    // Clear the search input
    $("#search").val("");

    // Reload all products
    loadProductsToPage({});
};
// Load category filter checkboxes
var fillCategoryListUnderFilter = () => {
    axios.get('/category/list').then((response) => {
        var categoryList = response.data;
        categoryList.forEach((category) => {
            var divTag = $("<div/>").addClass("form-check");
            var checkbox = $(`<input type="checkbox" value="${category}" class="form-check-input"/>`);
            var label = $(`<label class="form-check-label">${category}</label>`);
            divTag.append(checkbox).append(label);

            $("#categoryList").append(divTag);
           
        });
         const defaultPrice = $("#priceRangeBar").val();
            $("#selectedPrice").text(defaultPrice);

    }).catch((err) => {
        console.error("Failed to load categories", err);
    });
};

var loadMoreDetailsPage =(id)=> {

    window.open('/productMoreDetails.html?id=${id}','_blank');
}


// Sort by Title
var sortByTitle = (order) => {
    if (!order || !allProducts) return;

    allProducts.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        return order === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });

    renderProducts(allProducts);
};

// Sort by Price
var sortByPrice = (order) => {
    if (!order || !allProducts) return;

    allProducts.sort((a, b) => {
        return order === 'lowHigh' ? a.price - b.price : b.price - a.price;
    });

    renderProducts(allProducts);
};

// Optionally call on page load
$(document).ready(() => {
    fillCategoryListUnderFilter();
    loadProductsToPage();
});


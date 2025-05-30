var readProductDetails = () => {
    var productDetails = {};
    productDetails.title = $("#p_title").val();
    productDetails.price = $("#p_price").val();
    productDetails.description = $("#p_desc").val();
    productDetails.category = $("#p_category").val();
    productDetails.image = $("#p_image").val();
    productDetails.rating = $("#p_rating").val();

    axios.post('/add/new/product', productDetails).then((result) => {
        resetFields();
        
    }).catch((err) => {
        
    });
}

var resetFields = () => {

}
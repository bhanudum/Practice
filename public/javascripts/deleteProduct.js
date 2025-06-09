
function deleteProduct(productId) {
    if (!confirm("Are you sure you want to delete this product?")) 
        return;

    axios.post('/delete/product', { _id: productId }, 
        {
        headers: { "Authorization": `Bearer ${jwtToken}` }
    }).then((response) => {
        if (response.data.msg === "success") {

            console.log(response.data+ " Product was deleted successfully");
            alert("Product was deleted successfully.");
            
            loadProductsToPage();  // Refresh list
        } else {
            alert("Failed to delete the product.");
        }
    }).catch((err) => {
        console.error("Delete error", err);
        alert("Error deleting product");
    });
}

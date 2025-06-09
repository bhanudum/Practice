var productDetails = {};
var imageUploaded = false;

const loadCategories = () => {
  axios.get('/category/list')
    .then((response) => {
      const categories = response.data;
      const categorySelect = $("#p_category");

      categorySelect.empty().append('<option value="">-- Select Category --</option>');
      categories.sort((a, b) => a.localeCompare(b));

      categories.forEach(category => {
        const formatted = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
        categorySelect.append(`<option value="${category}">${formatted}</option>`);
      });
    })
    .catch(err => {
      console.error("Failed to load categories", err);
    });
};


var readProductDetails = () => {

    if (!imageUploaded) {
        alert("Please upload an image before saving the product.");
        return;}
   
    productDetails.title = $("#p_title").val();
    productDetails.price = parseInt($("#p_price").val());
    productDetails.description = $("#p_desc").val();
    productDetails.category = $("#p_category").val();
    //productDetails.image = $("#p_image").val();
    productDetails.rating = {};
    productDetails.rating.rate = $("#p_rating").val();

    axios.post('/add/new/product', productDetails).then((result) => {
               
        $("#msgBlock").text("New product Product added successfully!").show().fadeOut(5000);
      
        resetFields();
        imageUploaded = false;
        
    }).catch((err) => {
        
    });
}

var resetFields = () => {


    $("#p_title").val('');
    $("#p_price").val('');
    $("#p_desc").val('');
    $("#p_category").val('');
     $("input[name='prodImage']").val(''); 
    
    $("#p_rating").val('');
    $("#uploadBtn").prop("disabled", true);
}

var uploadImage = () => {

    let uploadfile = $("input[name=prodImage]")[0].files[0]
    let formData = new FormData();  
 

    formData.append('prodImage', uploadfile);


    axios.post('/upload/resource', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        }).then((response) => {
        console.log(response);
        productDetails.image =response.data.file_path;
        imageUploaded = true;
        
        $("#msgBlock").text("Image uploaded successfully!").show().fadeOut(3000);
    }).catch((err) => {
        console.error("Failed to upload image", err);
    });
}

function handleFileChange() {
  const fileInput = $("input[name='prodImage']")[0];
  $("#uploadBtn").prop("disabled", !fileInput.files.length); // Enable if file selected
}

$(document).ready(() => {
  loadCategories();
});


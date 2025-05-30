var addRatingStarsToContainer = (rating, containerRef) => {
    var ratingContainer = document.createElement('div');
    ratingContainer.setAttribute("class", 'starContainer');
    var fullStars = parseInt(rating);
    var halfStar = 0;
    for (var i = 0 ; i < fullStars; i++) {
        var divTag = document.createElement('div');
        divTag.setAttribute('class', 'star fullStar');
        ratingContainer.append(divTag);
    }
    if (rating % 1 != 0) {
        halfStar = 1;
        var divTag = document.createElement('div');
        divTag.setAttribute('class', 'star halfStar');
        ratingContainer.append(divTag);
    }
    var disableStars = 5 - (fullStars + halfStar);
    for (var i = 0 ; i < disableStars; i++) {
        var divTag = document.createElement('div');
        divTag.setAttribute('class', 'star emptyStar');
        ratingContainer.append(divTag);
    }
    document.querySelector(containerRef).append(ratingContainer);

}

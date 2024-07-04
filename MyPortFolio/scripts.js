(document).ready(function(){
    $('.project-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev">&#8592; Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next &#8594;</button>',
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
});
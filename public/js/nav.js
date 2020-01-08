AOS.init();

$('.nav-item').on('click', function() {
    $('.active').removeClass('active')
    let itemName = $(this).children().attr('href')
    $(this).addClass('active').removeClass('d-none')
    $(itemName).addClass('active')
})
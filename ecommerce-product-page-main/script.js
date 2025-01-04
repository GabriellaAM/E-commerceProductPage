let cartButton = document.querySelector('header nav .user-area button');
let productsCart = document.querySelector('header nav .user-area .productsCart');

cartButton.addEventListener('mouseenter', () => {
    productsCart.style.visibility = 'visible';
});

cartButton.addEventListener('mouseleave', () => {
    productsCart.style.visibility = 'hidden';
});

productsCart.addEventListener('mouseenter', () => {
    productsCart.style.visibility = 'visible';
});

productsCart.addEventListener('mouseleave', () => {
    productsCart.style.visibility = 'hidden';
});
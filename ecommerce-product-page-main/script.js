// Show cart

let cartButton = document.querySelector('header nav .user-area button');
let productsCart = document.querySelector('header nav .user-area .productsCart');
let isClicked = false;
let AddToCartButton = document.querySelector(".cartButton")
let ProductstInCart = document.querySelector(".cart-product")
let CartEmpty = document.querySelector(".cartEmptyP")

AddToCartButton.addEventListener('click', () => {

    if (quantityNumber.textContent != 0) {
        AddToCartButton.classList.add("AddToCartButtonActive")
        cartProductQuantity.textContent = quantityNumber.textContent;
    }

    if (quantityNumber.textContent != 0) {
        if (productsCart.style.visibility == 'visible') {
            ProductstInCart.style.visibility = 'visible';
            CartEmpty.style.visibility = 'hidden';
        }
    }

    if (quantityNumber.textContent != 0) {
        cartDisplayQuantity.style.visibility = 'visible';
        cartDisplayQuantityNumber.textContent = quantityNumber.textContent;
    }

    // Calculo do valor x quantidade

    let CartProductPrice = document.querySelector(".cart-product-price")
    let finalPrice = document.querySelector(".cart-product-final-price")

    let priceText = CartProductPrice.textContent;
    let quantityText = cartDisplayQuantityNumber.textContent;

    let price = parseFloat(priceText.replace(/[$x]/g, '').trim());

    let quantityCalc = parseInt(quantityText.trim(), 10);

    let finalPriceXQuantity = price * quantityCalc;

    finalPrice.textContent = `$${finalPriceXQuantity.toFixed(2)}`;
})

function showCart() {
    productsCart.style.visibility = 'visible';
    if (AddToCartButton.classList.contains("AddToCartButtonActive")) {
        ProductstInCart.style.visibility = 'visible';
        CartEmpty.style.visibility = 'hidden';
    } else {
        CartEmpty.style.visibility = 'visible';
    }
}

function hideCart() {
    if (!isClicked) {
        productsCart.style.visibility = 'hidden';
        ProductstInCart.style.visibility = 'hidden';
        CartEmpty.style.visibility = 'hidden';
    }
}

cartButton.addEventListener('mouseenter', showCart);
productsCart.addEventListener('mouseenter', showCart);

cartButton.addEventListener('mouseleave', hideCart);
productsCart.addEventListener('mouseleave', hideCart);

cartButton.addEventListener('click', () => {
    isClicked = !isClicked;
    productsCart.style.visibility = isClicked ? 'visible' : 'hidden';

    if (productsCart.style.visibility == 'visible') {
        if (AddToCartButton.classList.contains("AddToCartButtonActive")) {
            ProductstInCart.style.visibility = 'visible'
            CartEmpty.style.visibility = 'hidden';
        } else {
            CartEmpty.style.visibility = 'visible';
        }
    }

    if (productsCart.style.visibility == 'hidden') {
        if (AddToCartButton.classList.contains("AddToCartButtonActive")) {
            ProductstInCart.style.visibility = 'hidden'
        } else {
            CartEmpty.style.visibility = 'hidden';
        }
    }
});

// Increase and decrease quantity

let quantityNumber = document.querySelector('.quantity');
let increaseQuantity = document.querySelector('.quantityAdd');
let decreaseQuantity = document.querySelector('.quantityDelete');
let cartDisplayQuantity = document.querySelector('.cart-display-quantity');
let cartDisplayQuantityNumber = document.querySelector('.cart-display-quantity-number');
let cartProductQuantity = document.querySelector('.cart-product-quantity')
let quantity = 0

increaseQuantity.addEventListener('click', () => {
    quantityNumber.textContent = ++quantity;
})

decreaseQuantity.addEventListener('click', () => {
    if (quantity != 0) {
        quantityNumber.textContent = --quantity;
    }
})


// Trocar MainImage 

let mainImage = document.querySelector(".mainImage");
let thumbnails = document.querySelectorAll(".thumbnail");

function updateMainImage(event) {
    let pickedThumb = event.target;
    let largeImage = pickedThumb.dataset.large;

    mainImage.src = largeImage;
}

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", updateMainImage);
})


// Ícone de lupa ao passar o mouse sobre a mainImage

document.querySelector(".mainImage").addEventListener('mouseover', function () {
    this.style.cursor = 'zoom-in';
})

document.querySelector(".mainImage").addEventListener('mouseout', function () {
    this.style.cursor = 'default';
})


// Abrir a lightbox

mainImage.addEventListener('click', (event) => {

    if (window.innerWidth >= 1024) {
        selectedImage = event.target;
        lightboxMainImage = document.querySelector(".lightbox-mainImage");
        lightboxMainImage.src = selectedImage.src;

        document.querySelector(".screenBlur").style.display = 'block';
        document.body.classList.add('modalOpen');
        document.querySelector(".lightbox").style.display = 'flex';
    }
})


// Fechar a lightbox

document.querySelector(".lightbox-icon-close").addEventListener('click', () => {
    document.querySelector(".screenBlur").style.display = 'none';
    document.body.classList.remove('modalOpen');
    document.querySelector(".lightbox").style.display = 'none';
})


// Trocar MainImage na lightbox

let lightboxMainImage = document.querySelector(".lightbox-mainImage");
let lightboxThumbnails = document.querySelectorAll(".lightbox-thumbnail");
let lightboxNextButton = document.querySelector(".lightbox-buttonNext");
let lightboxPreviousButton = document.querySelector(".lightbox-buttonPrevious");

let lightboxLargeImages = Array.from(lightboxThumbnails).map((thumb) => thumb.dataset.large);
let lightboxSmallImages = Array.from(lightboxThumbnails);

let index = 0;

function updateLightboxMainImage(event) {
    let pickedThumb = event.target;
    let largeImage = pickedThumb.dataset.large;

    lightboxMainImage.src = largeImage;

    document.querySelector(".selected")?.classList.remove('selected');
    document.querySelector(".opacity")?.classList.remove('opacity');

    pickedThumb.classList.add('opacity');
    pickedThumb.parentElement.classList.add('selected');

    index = lightboxLargeImages.indexOf(largeImage);
}

lightboxSmallImages.forEach((thumbnail) => {
    thumbnail.addEventListener("click", updateLightboxMainImage);
});


// Função para atualizar a imagem principal com base no índice (para as setas)

function updateLightboxMainImageArrows(index) {

    lightboxMainImage.src = lightboxLargeImages[index];

    document.querySelector(".selected")?.classList.remove('selected');
    document.querySelector(".opacity")?.classList.remove('opacity');

    lightboxSmallImages[index].classList.add('opacity');
    lightboxSmallImages[index].parentElement.classList.add('selected');
}

lightboxNextButton.addEventListener('click', () => {
    index = (index + 1) % lightboxLargeImages.length;
    updateLightboxMainImageArrows(index);
});

lightboxPreviousButton.addEventListener('click', () => {
    index = (index - 1 + lightboxLargeImages.length) % lightboxLargeImages.length;
    updateLightboxMainImageArrows(index);
});

// Deletar produto do carrinho

let deleteProductCart = document.querySelector(".delete-button");

deleteProductCart.addEventListener('click', () => {
    AddToCartButton.classList.remove("AddToCartButtonActive");
    cartDisplayQuantity.style.visibility = 'hidden';
    ProductstInCart.style.visibility = 'hidden';
    CartEmpty.style.visibility = 'visible';
})

// Fechar Menu Mobile

let buttonCloseMobileMenu = document.querySelector(".closeButtonIcon");
let menuLinksWrapper = document.querySelector(".menuLinks-Wrapper");
let menuIcon = document.querySelector(".menu-icon");

buttonCloseMobileMenu.addEventListener('click', () => {
    menuLinksWrapper.classList.remove("open");
})

menuIcon.addEventListener('click', () => {
    menuLinksWrapper.classList.add("open");
})


// Alternar entre imagens mobile

let MainImageMobile = document.querySelector(".mainImage");
let ThumbnailsMobile = document.querySelectorAll(".thumbnail");
let NextButtonMobile = document.querySelector(".buttonNext");
let PreviousButtonMobile = document.querySelector(".buttonPrevious");

let LargeImagesMobile = Array.from(ThumbnailsMobile).map((thumb) => thumb.dataset.large);
let SmallImagesMobile = Array.from(ThumbnailsMobile);

let indexMobile = 0;

function updateMobileMainImageArrows(indexMobile) {

    MainImageMobile.src = LargeImagesMobile[indexMobile];
}

NextButtonMobile.addEventListener('click', () => {
    indexMobile = (indexMobile + 1) % LargeImagesMobile.length;
    updateMobileMainImageArrows(indexMobile);
});

PreviousButtonMobile.addEventListener('click', () => {
    indexMobile = (indexMobile - 1 + LargeImagesMobile.length) % LargeImagesMobile.length;
    updateMobileMainImageArrows(indexMobile);
});






// hard coded images urls, but it should be fetched from the server
let images = ['./img/gallery-slide-1.jpg', './img/gallery-slide-2.jpg', './img/gallery-slide-3.jpg'];
let counter = 0;
const interval = 8000;
const carouselEl = document.querySelector('.carousel');
const carouselNavigation = carouselEl.querySelector('.carousel__navigation__buttons');
let carouselInterval = setInterval(() => clickHandler(1), interval);

const createImageEl = (image, direction) => {
    // Page numeration
    const pageNumberContainer = document.querySelector('.page_number');
    pageNumberContainer.innerHTML = `Page ${counter + 1} of ${images.length}`;
    pageNumberContainer.dataset.slideNum = counter;
    // ==================

    const currentActiveImages = document.querySelectorAll('.img_wrapper');
    let imgClass = 'image_active';
    let oppositeImgClass;

    if (direction === 1) imgClass = 'image_right';
    if (direction === -1) imgClass = 'image_left';
    (imgClass === 'image_right') ? oppositeImgClass = 'image_left' : oppositeImgClass = 'image_right';

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('img_wrapper', imgClass);

    const img = document.createElement('img');
    img.setAttribute('src', image);

    imgWrapper.appendChild(img);
    carouselEl.appendChild(imgWrapper);

    setTimeout(() => {
        currentActiveImages && addSlideEffect(currentActiveImages, imgClass, oppositeImgClass);
        imgWrapper.classList.add('image_active');
    }, 100);

    setTimeout(() => {
        imgWrapper.classList.remove(imgClass);
        currentActiveImages && removePrevImages(currentActiveImages)
    }, 1000);

};

const addSlideEffect = (currentActiveImages, imgClass, oppositeImgClass) => {
    [].forEach.call(currentActiveImages, (image) => {
        image.classList.remove('image_active', imgClass);
        image.classList.add(oppositeImgClass);

    })
};

const removePrevImages = (removePrevImages) => {
    [].forEach.call(removePrevImages, (image) => image.remove());
};

const clickHandler = (moveTo) => {
    if(moveTo === 1) {
        (images.length - 1 > counter) ? counter += 1 : counter = 0
    } else {
        (counter > 0) ? counter -= 1 : counter = images.length - 1
    }

    createImageEl(images[counter], moveTo)
};

carouselNavigation.addEventListener('click', (event) => {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => clickHandler(1), interval);

    (event.target.classList.contains('btn_left')) && clickHandler(-1);
    (event.target.classList.contains('btn_right')) && clickHandler(1);
});

createImageEl(images[counter]);


// PopUp
const openPopupEl = document.querySelector('.carousel__open_img');
const popupWindow = document.querySelector('.article__popup');

const showPopup = () => {
    const slideNumber = parseInt(document.querySelector('.page_number').dataset.slideNum);

    clearInterval(carouselInterval);
    popupWindow.innerHTML = `<img src=${images[slideNumber]} alt="slide image"/>`;
    popupWindow.classList.add('visible');
};

openPopupEl.addEventListener('click', showPopup);

popupWindow.addEventListener('click', () => {
    popupWindow.classList.remove('visible');
    carouselInterval = setInterval(() => clickHandler(1), interval);
});

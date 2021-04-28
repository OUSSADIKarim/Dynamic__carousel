const carousel = document.querySelector(`.carousel`)
let images

const createImg = (imgsData) => {
    return imgsData.map(img => {
        return `
            <li class="carousel__slide">
                <img src="${img.URL}" alt="${img.imageName}" class="carousel__image">
            </li>
        `
    }).join("")
}

const createIndicators = (array) => {
    return array.map(() => {
        return `
            <button class="carousel__indicator"></button>
        `
    }).join("")
}

const carouselTemplate = () => {
    return carousel.innerHTML = `
        <button class="carousel__button carousel__button--left carousel__button--hide" >
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 1.75L2.75 5.5L6.5 9.25L5.75 10.75L0.5 5.5L5.75 0.25L6.5 1.75Z" fill="#FF5722"/>
            </svg>            
        </button>
    

        <div class="carousel__track-container">
            <ul class="carousel__track">
                ${createImg(images)}
            </ul>
        </div>

        <button class="carousel__button carousel__button--right">
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.62813 0.5L6.62812 5.5L1.62813 10.5L0.375 9.25L4.12813 5.5L0.375 1.75L1.62813 0.5Z" fill="#FF5722"/>
            </svg>            
        </button>

        <div class="carousel__nav">
            ${createIndicators(images)}
        </div>
    `
}

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translate3d(-${targetSlide.style.left}, 0, 0)`
    currentSlide.classList.remove(`carousel__slide--current`)
    targetSlide.classList.add(`carousel__slide--current`)
}

const updateIndicators = (currentIndicator, targetIndicator) => {
    currentIndicator.classList.remove(`carousel__indicator--current`)
    targetIndicator.classList.add(`carousel__indicator--current`)
}

const hideBtn = (targetIndex, leftBtn, rightBtn, slides) => {
    if (targetIndex === 0) {
        leftBtn.classList.add(`carousel__button--hide`)
        rightBtn.classList.remove(`carousel__button--hide`)
    } else if (targetIndex === slides.length - 1){
        leftBtn.classList.remove(`carousel__button--hide`)
        rightBtn.classList.add(`carousel__button--hide`)
    } else {
        leftBtn.classList.remove(`carousel__button--hide`)
        rightBtn.classList.remove(`carousel__button--hide`)
    }
}

fetch("carousel.json")
    .then(response => {
        return response.json()
    })
    .then(data => {
        images = data
    })
    .then(() => {
      carouselTemplate()
    })
    .then(() => {
        const track = carousel.querySelector(`.carousel__track`)
        const slides = Array.from(track.children)
        const slideWidth = slides[0].getBoundingClientRect().width
        const firstSlide = track.querySelector(`.carousel__slide`)
        const firstIndicator = carousel.querySelector(`.carousel__indicator`)
        const rightBtn = carousel.querySelector(`.carousel__button--right`)
        const leftBtn = carousel.querySelector(`.carousel__button--left`)
        const carouselNav = carousel.querySelector(`.carousel__nav`)
        const indicators = Array.from(carouselNav.children)

        slides.forEach((slide, index) => {
            slide.style.left = `${slideWidth * index}px`
        })

        
        firstSlide.classList.add(`carousel__slide--current`)
        firstIndicator.classList.add(`carousel__indicator--current`)

        rightBtn.addEventListener(`click`, e => {
            const currentSlide = track.querySelector(`.carousel__slide--current`)
            const nextSlide = currentSlide.nextElementSibling 
            const targetSlideIndex = slides.findIndex(slide => slide === nextSlide)
            const currentIndicator = carouselNav.querySelector(`.carousel__indicator--current`) 
            const nextIndicator = currentIndicator.nextElementSibling

            moveToSlide(track, currentSlide, nextSlide)
            updateIndicators(currentIndicator, nextIndicator)
            hideBtn(targetSlideIndex, leftBtn, rightBtn, slides)
        })

        leftBtn.addEventListener(`click`, e => {
            const currentSlide = track.querySelector(`.carousel__slide--current`)
            const prevSlide = currentSlide.previousElementSibling
            const targetSlideIndex = slides.findIndex(slide => slide === prevSlide)
            const currentIndicator = carouselNav.querySelector(`.carousel__indicator--current`) 
            const prevIndicator = currentIndicator.previousElementSibling

            moveToSlide(track, currentSlide, prevSlide)
            updateIndicators(currentIndicator, prevIndicator)
            hideBtn(targetSlideIndex, leftBtn, rightBtn, slides)
        })



        carouselNav.addEventListener(`click`, e => {
            targetIndicator = e.target.closest(`button`)
            
            if(!targetIndicator) return 
            
            const currentSlide = track.querySelector(`.carousel__slide--current`)
            const currentIndicator = carouselNav.querySelector(`.carousel__indicator--current`)
            const targetIndex = indicators.findIndex(indicator => indicator === targetIndicator)
            const targetSlide = slides[targetIndex]

            moveToSlide(track, currentSlide, targetSlide)
            updateIndicators(currentIndicator, targetIndicator)
            hideBtn(targetIndex, leftBtn, rightBtn, slides)
        })
    })


 

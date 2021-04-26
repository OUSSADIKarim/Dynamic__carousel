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
        <button class="carousel__button carousel__button--left">
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
        const indicator = document.querySelector(`.carousel__indicator`)
        indicator.classList.add(`carousel__indicator--current`)
    })


 

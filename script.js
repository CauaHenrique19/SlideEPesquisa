const sliderContainer = document.querySelector('.slider')

let viewNumber = 1
var translateValue = -1410
const maxViewNumber = Math.ceil(products.length / 6)

function renderProducts(products) {
    sliderContainer.innerHTML = products.map(product =>
        `<div class="offer">
            <div class="offer-img">
                <img src="${product.imagemUrl}" alt="">
            </div>
            <div class="offer-info">
                <h2>R$ ${product.preco}</h2>
                <p class="category">${product.categoria}</p>
                <p>${product.nome.substr(0, 20) + '...'}</p>
            </div>
        </div>`).join('')
}

function renderSlideCircle() {
    for (let i = 1; i <= maxViewNumber; i++){
        document.querySelector('.circles').innerHTML += 
            i === 1 ? `<div class="circle selected" viewNumber="${i}"></div>` : 
        `<div class="circle" viewNumber="${i}"></div>`
    }
}

renderProducts(products)
renderSlideCircle()

function search(e){
    var searchValue = e.target.value
    var searchProducts = products.filter(produto => produto.nome.toLowerCase().includes(searchValue))
    renderProducts(searchProducts)
}

const btnNext = document.querySelector('.btn-next')
const btnPrevious = document.querySelector('.btn-previous')

const offersTags = document.querySelectorAll('.offer')
sliderContainer.style.gridTemplateColumns = `repeat(${offersTags.length}, 1fr)`

function nextView() {
    translateValue == 0 ? translateValue = -1410 : ''
    translateValue = -1410 * viewNumber

    sliderContainer.style.transform = `translate3d(${translateValue}px, 0, 0)`

    viewNumber++
    setClassCircle()
    setVisibleButtons()
}

function backView(){
    translateValue == 0 ? translateValue = -1410 : translateValue -= -1410
    sliderContainer.style.transform = `translate3d(${translateValue}px, 0, 0)`

    viewNumber--
    setClassCircle()
    setVisibleButtons()
}

function setVisibleButtons() {
    viewNumber == maxViewNumber ? btnNext.style.visibility = 'hidden' : btnNext.style.visibility = 'visible'
    viewNumber > 1 ? btnPrevious.style.visibility = 'visible' : btnPrevious.style.visibility = 'hidden'
}

function setClassCircle() {
    document.querySelectorAll('.circle').forEach(circle => circle.classList.remove('selected'))

    const circle = document.querySelector(`[viewNumber="${viewNumber}"]`)
    circle.classList.add('selected')
}

btnNext.addEventListener('click', nextView)
btnPrevious.addEventListener('click', backView)
document.querySelector('.search-input').addEventListener('keyup', search)



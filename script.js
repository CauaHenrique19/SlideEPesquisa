const sliderContainer = document.querySelector('.slider')

let viewNumber = 1
var translateValue = -1410
const maxViewNumber = Math.ceil(products.length / 6)

function renderProducts(products) {
    sliderContainer.innerHTML = products.map(produto =>
        `<div class="oferta">
            <div class="oferta-img">
                <img src="${produto.imagemUrl}" alt="">
            </div>
            <div class="oferta-info">
                <h2>R$ ${produto.preco}</h2>
                <p class="produto-categoria">${produto.categoria}</p>
                <p>${produto.nome.substr(0, 45) + '...'}</p>
            </div>
        </div>`).join('')
}

function renderSlideCircle() {
    for (let i = 1; i <= maxViewNumber; i++){
        document.querySelector('.circulos').innerHTML += 
            i === 1 ? `<div class="circulo neste" data-linha="${i}"></div>` : 
        `<div class="circulo" data-linha="${i}"></div>`
    }
}

renderProducts(products)
renderSlideCircle()

function search(e){
    var searchValue = e.target.value
    var searchProducts = products.filter(produto => produto.nome.toLowerCase().includes(searchValue))
    renderProducts(searchProducts)
}

const btnNext = document.querySelector('.prox')
const btnPrevious = document.querySelector('.antes')

const offersTags = document.querySelectorAll('.oferta')
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
    document.querySelectorAll('.circulo').forEach(circle => circle.classList.remove('neste'))

    const circle = document.querySelector(`[data-linha="${viewNumber}"]`)
    circle.classList.add('neste')
}

btnNext.addEventListener('click', nextView)
btnPrevious.addEventListener('click', backView)
document.querySelector('.input-pesquisa').addEventListener('keyup', search)



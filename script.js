const slider = document.querySelector('.slider')

function gerarProdutos(obj) {
    slider.innerHTML = obj.map((produto) =>
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
gerarProdutos(produtos)

const input = document.querySelector('.input-pesquisa')

input.addEventListener('keyup', e => {
    var pesquisa = e.target.value
    var produtosCorrespondentes = produtos.filter((produto) => produto.nome.toLowerCase().includes(pesquisa))
    gerarProdutos(produtosCorrespondentes)
})

const divs = document.querySelectorAll('.oferta')

const btnProx = document.querySelector('.prox')
const btnAntes = document.querySelector('.antes')

let linha = 1
var valorTranslate = -1410
const maxLinha = Math.ceil(produtos.length / 6)

slider.style.gridTemplateColumns = `repeat(${divs.length}, 1fr)`
renderSlideCircle()

function next() {
    valorTranslate == 0 ? valorTranslate = -1410 : ''
    valorTranslate = -1410 * linha

    slider.style.transform = `translate3d(${valorTranslate}px, 0, 0)`

    linha++
    marcarCirculosSlides()
    setVisibleButtons()
}

function back(){
    valorTranslate == 0 ? valorTranslate = -1410 : valorTranslate -= -1410
    slider.style.transform = `translate3d(${valorTranslate}px, 0, 0)`

    linha--
    marcarCirculosSlides()
    setVisibleButtons()
}

btnProx.addEventListener('click', next)
btnAntes.addEventListener('click', back)

function setVisibleButtons() {
    linha == maxLinha ? btnProx.style.visibility = 'hidden' : btnProx.style.visibility = 'visible'
    linha > 1 ? btnAntes.style.visibility = 'visible' : btnAntes.style.visibility = 'hidden'
}

function renderSlideCircle() {
    const localCirculos = document.querySelector('.circulos')
    for (let i = 1; i <= maxLinha; i++){
        localCirculos.innerHTML += i === 1 ? `<div class="circulo neste" data-linha="${i}"></div>` : `<div class="circulo" data-linha="${i}"></div>`
    }
}

function marcarCirculosSlides() {
    document.querySelectorAll('.circulo').forEach((circulo) => circulo.classList.remove('neste'))

    const circulo = document.querySelector(`[data-linha="${linha}"]`)
    circulo.classList.add('neste')
}



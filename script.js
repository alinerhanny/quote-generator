//seleção de elementos

const quote = document.querySelector('.quote'),
tagsContainer = document.querySelector('.tags'),
author = document.querySelector('.autor'),
randomBtn = document.getElementById('random'),
shareBtn = document.getElementById('share')

//função assíncrona que gera citações aleatórias

async function generateQuote() {
 try {

    const response = await fetch('https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json')

    const data = await response.json()

    //Seleciona uma citação aleatória
    const randomIndex = Math.floor(Math.random() * data.length)
    const quoteData = data[randomIndex]

    //Atualiza os dados da citação
    author.textContent = quoteData.author
    quote.textContent = `"${quoteData.quote}"`

    //limpa as tags anteriores
    tagsContainer.innerHTML = ''

    //adiciona novas tags à citação
    quoteData.tags.forEach((tag) => {
        const span = document.createElement('span')
        span.className = 'tag'
        span.textContent = tag
        tagsContainer.appendChild(span)
    })

    } catch(error) {
        console.log('Ops! Algo deu errado', error)
    }
}

//gera uma citação aleatória
randomBtn.addEventListener('click', generateQuote)
//exibe uma citação assim que a página é carregada
window.addEventListener('DOMContentLoaded', generateQuote)


//variáveis que armazenam a citação e o autor
const quoteText = quote.textContent
const authorText = author.textContent
const fullQuote = `${quoteText} - ${authorText}`


//Compartilhar citação
shareBtn.addEventListener('click', () => {

    //caso o navegador suporte o compartilhamento
    if(navigator.share) {
        navigator.share({
            title: 'Citação Inspiradora',
            text: fullQuote,
            url: window.location.href
        }).then(() => {
            console.log('Compartilhado com sucesso!')
        }) .catch((err) => {
            console.error('Erro ao compartilhar', err)
        })
    } else {
        alert('Compartilhamento não suportado neste navegador.')
    }
})


//Copiar citação
quote.addEventListener('click', () => {
    //copia a citação para a área de transferência
    navigator.clipboard.writeText(fullQuote)
    .then(() => {
        const toast = document.getElementById('copyToast')
        toast.classList.add('show')

        //remove a notificação após 2 segundos
        setTimeout(() => {
            toast.classList.remove('show')
        }, 2000)
    })
    .catch((err) => {
        console.error('Erro ao copiar: ', err)
    })
})



import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
    const colors = {
        visa: ['#17283A', '#D9BB7D'],
        mastercard: ['#E3001A', '#EF991B'],
        nubank: ['#7E0ACA', '#8605B8'],
        neon: ['#11A9F3', '#12DCDF'],
        default: ['black', 'gray'],
    }

    ccBgColor01.setAttribute('fill', colors[type][0])
    ccBgColor02.setAttribute('fill', colors[type][1])

    ccLogo.setAttribute('src', `cc-${type}.svg`)
}

setCardType()

globalThis.setCardType() = setCardType
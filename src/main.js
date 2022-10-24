import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
    const colors = {
        visa: ['#17283A', '#D9BB7D'],
        mastercard: ['#E3001A', '#EF991B'],
        americanExpress: ['#D6E5DE', '#ACBBB2'],
        discover: ['#F7A027', '#82310F'],
        dinners: ['#A01111', '#270B0E'],
        jcb: ['#1C0E0B', '#DEB758'],
        unionpay: ['#8EFCEF', '#B81532'],
        nubank: ['#7E0ACA', '#8605B8'],
        neon: ['#11A9F3', '#12DCDF'],
        default: ['black', 'gray'],
    }

    ccBgColor01.setAttribute('fill', colors[type][0])
    ccBgColor02.setAttribute('fill', colors[type][1])

    ccLogo.setAttribute('src', `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

const securityCode = document.getElementById('security-code')
const securityCodePattern = {
    mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.getElementById('expiration-date')
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
        },
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2),
        }
    }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.getElementById('card-number')
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardtype: "visa",
        },

        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,2}/,
            cardtype: "mastercard",
        },

        {
            mask: "0000 0000 0000 0000",
            regex: /^3[4-7]\d{0,13}/,
            cardtype: "americanExpress",
        },

        {
            mask: "0000 0000 0000 0000",
            regex: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
            cardtype: "discover",
        },

        {
            mask: "0000 0000 0000 0000",
            regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
            cardtype: "dinners",
        },

        {
            mask: "0000 0000 0000 0000",
            regex: /^(?:2131|1800|35\d{3})\d{11}$/,
            cardtype: "jcb"
        },

        {
            mask: "0000 0000 0000 0000",
            regex: /^62\d{0,14}/,
            cardtype: "unionpay"
        },

        {
            mask: "0000 0000 0000 0000",
            regex: /^8\d{0,15}/,
            cardtype: "nubank",
        },

        {
            mask: "0000 0000 0000 0000",
            regex: /^9\d{0,15}/,
            cardtype: "neon",
        },

        {
            mask: "0000 0000 0000 0000",
            cardtype: "default"
        },
    ],
    dispatch: function(appended, dynamicMasked){
        const number = (dynamicMasked.value + appended).replace(/\D/g,'')
        const foundMask = dynamicMasked.compiledMasks.find(function(item){
            return number.match(item.regex)
        })

        return foundMask
    }
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

document.querySelector("form").addEventListener('submit', (event) => {
    event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener('input', () => {
    const ccHolder = document.querySelector(".cc-holder .value")

    ccHolder.innerText = cardHolder.value.length === 0 ? 'FULANO DA SILVA' : cardHolder.value
})

securityCodeMasked.on("accept", () => {
    updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code){
    const ccSecurity = document.querySelector(".cc-security .value")
    
    ccSecurity.innerText = code.length === 0 ? "123" : code
}

cardNumberMasked.on("accept", () => {
    const cardType = cardNumberMasked.masked.currentMask.cardtype
    setCardType(cardType)
    updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number){
    const ccNumber = document.querySelector(".cc-number")
    ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

expirationDateMasked.on("accept", () => {
    updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date){
    const ccExpiration = document.querySelector(".cc-extra .value")

    ccExpiration.innerText = date.length === 0 ? "02/32" : date
}
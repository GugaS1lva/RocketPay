" VISA " // visa ^4\d{0,15}
" Inicia com '4' seguido de um dígito que pode se repetir de 0 até 15 ocorrências: "
4234234423432344


" MASTER " // master (^5[1-5]\d{0,2}|^22[2-9]\d|^2[3,7]\d{0,2})\d{0,2}
" Inicia com 5, seguido de um dígito entre 1 e 5, seguido de 0 ou mais 2 dígitos... "
" OU "
" Inicia com 22, seguido de um dígito entre 2 e 9, seguido de 0 ou mais 1 dígito... "
" OU "
" Inicia com 2, seguido de um dígito entre 3 e 7, seguido de 0 ou mais 2 dígitos... "
" Seguido de mais 12 dígitos "
5353535353535353
2323232323232323
2237235728362235



" 
EXEMPLO COM NÚMEROS (transformando qualquer coisa digitada para apenas números (usando expressões regulares rsrs)):

dispatch: function(appended, dynamicMasked){
    var number = (dynamicMasked.value + appended).replace(/\D/g,'')

    return dynamicMasked.compiledMasks.find(function (m) {
        return number.indexOf(m.startsWith) === 0
    })
}

Leitura do código:
Cada tecla digitada vai disparar a função anônima do dispatch.
Quando disparada [linha 23], pega o valor digitado [dynamicMasked.value] e concatena com o parâmetro 'appended'
    > Se digitado 4, vai pegar o valor atual do dynamicMasked (que é vazio) e vai concatenar com 4 (valor digitado).
E então ele vai fazer uma substituição (.replace()) só aceitando dígitos.
    > Se digitado A, vai pegar o valor atual do dynamicMasked (vazio) e vai concatenar com A, mas o replace vai rodar uma expressão regular pra fazer uma troca (se não for dígito, troque por vazio). No fim, tudo será apenas números.
    > Se digitado 4 (depois de já haver números dentro de dynamicMasked), concatene o valor atual com o 'appended'.
"

OBS: 
    Barra (find) word Barra(find) word:
    \w\w
    a2
    // No exemplo acima, ele vai encontrar uma palavra e um número (sim, full bugado).

    Barra (find não dígito) D, Barra (find não dígito) D:
    \D\D
    a2
    // No exemplo acima, ele vai encontrar apenas Não-Dígitos (números não são aceitos).




" RESUMO DO CÓDIGO main.js "
"
[linha: 2]     - Instalar a biblioteca IMask.
[linha: 4-7]   - Pegar elementos com o DOM.
[linha: 9-22]  - Criar uma função pra setar novos valores pros cartões dinamicamente.
[linha: 24]    - Transformar a função acima em global.

[linha: 26]    - Buscar o elemento.
[linha: 27-29] - Separar um pattern.
[linha: 30]    - Executar o IMask.

[linha: 32]    - Buscar o elemento.
[linha: 33-47] - Separar um pattern complexo (muito visto no mercado)
[linha: 48]    - Executar o IMask.

[linha: 50]    - Buscar o elemento.
[linha: 51-90] - Separar um pattern MUITO MAIS complexo (com Expressões Regulares). Com dynamicMasked.
[linha: 91]    - Executar o IMask.

Propriedade dispatch >>> 
É uma função que vai ser disparada quando houver alteração no teclado.
    - filtragem pra pegar somente números
    - uso do .find() pra encontrar algo. Esse .find() vai fazer a execução de uma função anônima, procurando um número que se estiver batendo com o regex, retornará a própria máscara encontrada, se não, não retorna.
"


======================================================================================================================
const cardsDynamicMasks = [
    {
        mask: '0000 000000 00000',
        regex: /^3[47]\d{0,13}/,
        cardtype: 'american express'
        # /^3[4-7]\d{0,13}/
    },
    
    {
        mask: '0000 0000 0000 0000',
        regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
        cardtype: 'discover'
        # /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/
    },
    {
        mask: '0000 000000 0000',
        regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
        cardtype: 'diners'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
        cardtype: 'mastercard'
    },
    {
        mask: '0000 000000 00000',
        regex: /^(?:2131|1800)\d{0,11}/,
        cardtype: 'jcb15'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: /^(?:35\d{0,2})\d{0,12}/,
        cardtype: 'jcb'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
        cardtype: 'maestro'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: /^4\d{0,15}/,
        cardtype: 'visa'
    },
    {
        mask: '0000 0000 0000 0000',
        regex: /^62\d{0,14}/,
        cardtype: 'unionpay'
    },
]

SITE DAS CARD REGRAS
https://stackoverflow.com/questions/9315647/regex-credit-card-number-tests

SITE DOS LOGOS
https://worldvectorlogo.com/
const submit = document.querySelector('#submit')
const productInfo = document.querySelector('#productInfo')
const productAll = document.querySelector('.product-all')
const inputsText = document.querySelectorAll('input[type="text"]')

//active enter button
inputsText.forEach(inputText => {
  inputText.addEventListener('input', () => {
    if(inputsText[0].value && inputsText[1].value && !isNaN(inputsText[2].value) && inputsText[2].value.length > 0){
      if(inputsText[1].value.endsWith('jpg') || inputsText[1].value.endsWith('jpeg') || inputsText[1].value.endsWith('svg') || inputsText[1].value.endsWith('png') || inputsText[1].value.endsWith('gif') || inputsText[1].value.endsWith('ico')){
        submit.classList = "_active"
      } else {
        submit.classList.remove("_active")
        
      }
    }
  })
})

submit.addEventListener('click', () => {
  if(submit.classList.contains('_active')){ 

    //adding a new product
    let addProduct = document.createElement('div')
    addProduct.classList = "product-item"

    let addProductImg = document.createElement('div')
    addProductImg.classList = "product-item__img"
    addProductImg.style.backgroundImage = `url(${inputsText[1].value})`
    addProduct.appendChild(addProductImg)
    
    let addProductName = document.createElement('h3')
    addProduct.appendChild(addProductName)
    let addProductNameText = document.createTextNode(inputsText[0].value)
    addProductName.appendChild(addProductNameText)

    let addProductInfo = document.createElement('p')
    addProductInfo.classList = "product-item__info"
    addProduct.appendChild(addProductInfo)
    let addProductInfoText = document.createTextNode(productInfo.value)
    addProductInfo.appendChild(addProductInfoText)

    let addProductPrice = document.createElement('p')
    addProductPrice.classList = "product-item__price"
    addProduct.appendChild(addProductPrice)
    let addProductPriceText = document.createTextNode(`${inputsText[2].value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} руб.`)
    addProductPrice.appendChild(addProductPriceText)

    let addProductDelete = document.createElement('div')
    addProductDelete.classList = "product-item__delete"
    let addProductDeleteImg = document.createElement('div')
    addProductDeleteImg.classList = "product-item__delete-img"
    addProductDelete.appendChild(addProductDeleteImg)
    addProduct.appendChild(addProductDelete)

    productAll.appendChild(addProduct)

    //return to original data
    inputsText.forEach(inputText => {
      if(inputText.value){
        inputText.classList.remove('_active')
        inputText.value = ''
        inputText.nextElementSibling.style.opacity = "0"
      }
    })
    productInfo.value = ''
    submit.classList.remove("_active")
  } else {
    //required input field
    inputsText.forEach(inputText => {
      if(!inputText.value){
        inputText.classList = '_active'
        inputText.nextElementSibling.style.opacity = "1"
      }
    })
  }
})

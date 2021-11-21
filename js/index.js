const submit = document.querySelector('#submit')
const productInfo = document.querySelector('#productInfo')
const productAll = document.querySelector('.product-all')
const inputsText = document.querySelectorAll('input[type="text"]')

if(!localStorage.getItem('colectionProducts')){
  localStorage.setItem('colectionProducts', JSON.stringify([]))
  colectionProducts = JSON.parse(localStorage.getItem('colectionProducts'))
} else{
  colectionProducts = JSON.parse(localStorage.getItem('colectionProducts'))
}

// console.log(colectionProducts)

//active enter button
inputsText.forEach(inputText => {
  inputText.addEventListener('input', () => {
    if(inputsText[0].value && inputsText[1].value && !isNaN(inputsText[2].value) && inputsText[2].value.length > 0){
      if(inputsText[1].value.endsWith('jpg') || inputsText[1].value.endsWith('jpeg') || inputsText[1].value.endsWith('svg') || inputsText[1].value.endsWith('png') || inputsText[1].value.endsWith('gif') || inputsText[1].value.endsWith('ico')){
        submit.classList = "_active"
      }
    }else {
      submit.classList.remove("_active")
    }
  })
})

submit.addEventListener('click', () => {
  if(submit.classList.contains('_active')){ 

    let itemProduct = {}
    itemProduct.img = inputsText[1].value
    itemProduct.h3 = inputsText[0].value
    itemProduct.info = productInfo.value
    itemProduct.price = inputsText[2].value
    itemProduct.id = colectionProducts.length

    colectionProducts.push(itemProduct)
    // console.log(itemProduct)
    // console.log(colectionProducts)

    localStorage.setItem('colectionProducts', JSON.stringify(colectionProducts))
    //adding a new product
    let addProduct = document.createElement('div')
    addProduct.classList = "product-item"
    addProduct.setAttribute('data-id', itemProduct.id)

    let addProductImg = document.createElement('div')
    addProductImg.classList = "product-item__img"
    addProductImg.style.backgroundImage = `url(${itemProduct.img})`
    addProduct.appendChild(addProductImg)
    
    let addProductName = document.createElement('h3')
    addProduct.appendChild(addProductName)
    let addProductNameText = document.createTextNode(itemProduct.h3)
    addProductName.appendChild(addProductNameText)

    let addProductInfo = document.createElement('p')
    addProductInfo.classList = "product-item__info"
    addProduct.appendChild(addProductInfo)
    let addProductInfoText = document.createTextNode(itemProduct.info)
    addProductInfo.appendChild(addProductInfoText)

    let addProductPrice = document.createElement('p')
    addProductPrice.classList = "product-item__price"
    addProduct.appendChild(addProductPrice)
    let addProductPriceText = document.createTextNode(`${itemProduct.price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} руб.`)
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
    if(inputsText[0].value){
      inputsText[0].classList.remove('_active')
      inputsText[0].nextElementSibling.style.opacity = "0"
    } else{
      inputsText[0].classList = '_active'
      inputsText[0].nextElementSibling.style.opacity = "1"
    }
    if(inputsText[1].value.endsWith('jpg') || inputsText[1].value.endsWith('jpeg') || inputsText[1].value.endsWith('svg') || inputsText[1].value.endsWith('png') || inputsText[1].value.endsWith('gif') || inputsText[1].value.endsWith('ico')){
      inputsText[1].classList.remove('_active')
      inputsText[1].nextElementSibling.style.opacity = "0"
    } else{
      inputsText[1].classList = '_active'
      inputsText[1].nextElementSibling.style.opacity = "1"
    }
    if(inputsText[2].value && inputsText[2].value.length > 0){
      inputsText[2].classList.remove('_active')
      inputsText[2].nextElementSibling.style.opacity = "0"
    } else{
      inputsText[2].classList = '_active'
      inputsText[2].nextElementSibling.style.opacity = "1"
    }
  }
})
function addingElementsToPage(arrow){
  
  arrow.forEach((item, index) => {
    if(item){
      let addProduct = document.createElement('div')
      addProduct.classList = "product-item"
      addProduct.setAttribute('data-id', index)

      let addProductImg = document.createElement('div')
      addProductImg.classList = "product-item__img"
      addProductImg.style.backgroundImage = `url(${item.img})`
      addProduct.appendChild(addProductImg)
      
      let addProductName = document.createElement('h3')
      addProduct.appendChild(addProductName)
      let addProductNameText = document.createTextNode(item.h3)
      addProductName.appendChild(addProductNameText)

      let addProductInfo = document.createElement('p')
      addProductInfo.classList = "product-item__info"
      addProduct.appendChild(addProductInfo)
      let addProductInfoText = document.createTextNode(item.info)
      addProductInfo.appendChild(addProductInfoText)

      let addProductPrice = document.createElement('p')
      addProductPrice.classList = "product-item__price"
      addProduct.appendChild(addProductPrice)
      let addProductPriceText = document.createTextNode(`${item.price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} руб.`)
      addProductPrice.appendChild(addProductPriceText)

      let addProductDelete = document.createElement('div')
      addProductDelete.classList = "product-item__delete"
      let addProductDeleteImg = document.createElement('div')
      addProductDeleteImg.classList = "product-item__delete-img"
      addProductDelete.appendChild(addProductDeleteImg)
      addProduct.appendChild(addProductDelete)

      productAll.appendChild(addProduct)
    }
  })
}
addingElementsToPage(colectionProducts)

function deletingAnItem(){
  const productItems = document.querySelectorAll('.product-item')
  
  productItems.forEach(productItem => {
    let deleteBtn = productItem.lastElementChild
    let indexItem = productItem.getAttribute('data-id') 
    
    deleteBtn.addEventListener('click', () => {
      productItem.parentNode.removeChild(productItem)
      delete colectionProducts[indexItem]
      localStorage.setItem('colectionProducts', JSON.stringify(colectionProducts))
    })
  }) 
  
}
deletingAnItem()

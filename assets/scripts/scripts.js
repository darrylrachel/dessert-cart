const container = document.getElementById('item-container')
const itemRow = document.querySelector('.item-row')
const itemCard = document.querySelector('.item-card')
const itemImg = document.querySelector('.item-img')
const itemCategory = document.querySelector('.item-category')
const itemName = document.querySelector('.item-name')
const itemPrice = document.querySelector('.item-price')
const details = document.querySelector('.details')
const addToCartButtons = document.querySelectorAll('.add-to-cart')

async function loadData() {
	// Fetch the file
	try {
		const response = await fetch('../../data.json')

		// Check if the response is successful
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		// Parse the JSON text into a usable JavaScript object
		const data = await response.json()
		return data
	} catch (error) {
		console.log('Could not fetch the JSON file: ', error)
	}
}

// Products
const products = await loadData()

//=========================================================================

function renderProducts(products) {
	products.forEach((product) => {
		const card = document.createElement('div')
		const button = document.createElement('button')
		card.classList.add('item-card')
		button.classList.add('btn')
		button.classList.add('product-button')

		let quantity = 0

		card.innerHTML = `
                <img class='item-img' src='${product.image.desktop}' alt='${product.name}'>
                <div class='details'>
                    <p class='item-category'>${product.category}</p>
                    <p class='item-name'>${product.name}</p>
                    <p class='item-price'>${product.price}</p>
                </div>
                
        `

		if (quantity === 0) {
			// button.innerHTML = `<img src='../images/icon-add-to-cart.svg'> Add to Cart`
			button.innerHTML = `<img class='cart-icon' src='${product.cartIcon}'> Add to Cart`
		} else {
			button.innerHTML = `None`
		}

		card.appendChild(button)

		itemRow.appendChild(card)
	})
}
renderProducts(products)

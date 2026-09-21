const container = document.getElementById('item-container')
const cartContainer = document.querySelector('.cart-container')
const itemRow = document.querySelector('.item-row')
const itemCard = document.querySelector('.item-card')
const itemImg = document.querySelector('.item-img')
const itemCategory = document.querySelector('.item-category')
const itemName = document.querySelector('.item-name')
const itemPrice = document.querySelector('.item-price')
const details = document.querySelector('.details')
const addToCartButtons = document.querySelectorAll('.add-to-cart')
const increaseButton = document.createElement('button')
const decreaseButton = document.createElement('button')
const cartIcon = 'assets/images/icon-add-to-cart.svg'
let cart = []

// Load Products
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
const products = await loadData()

//=========================================================================

// Render Products
function renderProducts(products) {
	products.forEach((product) => {
		const card = document.createElement('div')
		card.classList.add('item-card')

		card.innerHTML = `
                <img class='item-img' src='${product.image.desktop}' alt='${product.name}'>
                <div class='details'>
                    <p class='item-category'>${product.category}</p>
                    <p class='item-name'>${product.name}</p>
                    <p class='item-price'>${product.price}</p>
                </div>
                
        `

		const button = createCartButton(product)

		card.appendChild(button)
		itemRow.appendChild(card)
	})
}
renderProducts(products)

// Create cart button
function createCartButton(product) {
	const button = document.createElement('button')
	button.classList.add('btn')
	button.classList.add('product-button')
	let quantity = 0

	const cartItem = cart.find((item) => item.id === product.id)

	if (!cartItem) {
		button.innerHTML = `
		<img src='${cartIcon}'> Add to Cart
		`

		button.addEventListener('click', () => {
			addToCart(product)
		})
	} else {
		button.innerHTML = `
		<span>-</span>
		<span>${cartItem.quantity}</span>
		<span>+</span>
		`
	}

	return button
}

// modify cart
function addToCart(product) {
	cart.push({
		id: product.id,
		name: product.name,
		price: product.price,
		quantity: 1,
	})

	renderProducts(products)
}

// modify cart
function increaseQuantity(product) {
	if (cartItem) {
		cartItem.quantity++
	}

	renderProducts(products)
}

// modify cart
function decreaseQuantity(product) {
	const cartItem = cart.find((item) => item.id === product.id)

	if (cartItem) {
		cartItem.quantity--
	}

	if (cartItem.quantity === 0) {
		removeFromCart(products)
	}

	renderProducts(products)
}

// modify cart
function removeFromCart(product) {}

increaseButton.addEventListener('click', () => {
	increaseQuantity(products)
})

decreaseButton.addEventListener('click', () => {
	decreaseQuantity(products)
})

// CART SCRIPTS
//////////////////////////////////////
function renderCart(products) {
	const title = document.createElement('h3')
	const subTitle = document.createElement('p')
	const cartWrapper = document.createElement('div')
	title.classList.add('cart-title')
	subTitle.classList.add('cart-sub-title')

	// console.log('Need this to show in the cart', cart)

	cartWrapper.innerHTML = `
			<h3 class='cart-title'>Your Cart (Quantity)</h3>
			<p>Your added items will appear here</p>
			
			`
	cartContainer.appendChild(cartWrapper)
}
renderCart(products)

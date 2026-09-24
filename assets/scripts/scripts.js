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
const emptyCart = 'assets/images/illustration-empty-cart.svg'

let cart = []

// LOAD PRODUCTS
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

// RENDER PRODUCTS
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

// CART BUTTON
function createCartButton(product) {
	const button = document.createElement('button')
	button.classList.add('btn')
	button.classList.add('product-button')
	button.classList.add('active')
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

// INCREASE & DECREASE QUANTITIES
increaseButton.addEventListener('click', () => {
	increaseQuantity(products)
})

decreaseButton.addEventListener('click', () => {
	decreaseQuantity(products)
})

// MODIFY CART: ADD, INCREASE, DECREASE, REMOVE
function addToCart(product) {
	cart.push({
		id: product.id,
		name: product.name,
		price: product.price,
		quantity: 1,
	})

	renderCart(product)
	renderProducts(products)
}

function increaseQuantity(product) {
	if (cartItem) {
		cartItem.quantity++
		console.log(cartItem)
	}

	renderProducts(products)
}

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

function removeFromCart(product) {}

/////////////////////////////////////////////////////////////////////////
// CART
//////////////////////////////////////
function renderCart(products) {
	const cartWrapper = document.createElement('div')
	const title = document.createElement('h3')
	const subTitle = document.createElement('p')
	const emptyCartImg = document.createElement('img')
	cartWrapper.classList.add('cart-wrapper')
	title.classList.add('cart-title')
	subTitle.classList.add('cart-sub-title')
	emptyCartImg.classList.add('empty-cart-img')
	let cartHTML = ''

	///////////////////GET THE CART WORKING //////////////////////////////////////
	if (cart.length === 0) {
		cartWrapper.innerHTML = `
			<h3 class='cart-title'>Your Cart (0)</h3>
			<img class='empty-cart-img' src='${emptyCart}'>
			<p class='cart-sub-title'>Your added items will appear here</p>
		`
	} else {
		for (const item of cart) {
			cartHTML += `
				<p>${item.name}</p>
			`
		}
		cartWrapper.innerHTML = cartHTML
	}
	///////////////////GET THE CART WORKING //////////////////////////////////////

	cartContainer.appendChild(cartWrapper)
}
renderCart(products)

const URL = 'https://my.api.mockaroo.com';
const API_KEY = process.env.VUE_APP_MOCKAROO_API_KEY;

async function getCategories() {
	let response = makeRequest('/categories', 'GET')
	return await response
}

async function getProducts() {
	let response = makeRequest('/products', 'GET')
	return await response
}

async function getShops() {
	let response = makeRequest('/shops', 'GET')
	return await response
}

async function getShoppingLists() {
	let response = makeRequest('/shopping_lists', 'GET')
	return await response
}

async function postProduct(requestBody) {
	let response = makeRequest('/product', 'POST', requestBody)
	console.log(requestBody)
	return await response
}

async function postShoppingList(requestBody) {
	let response = makeRequest('/shopping_list', 'POST', requestBody)
	console.log(requestBody)
	return await response
}

async function makeRequest(endpoint, method, dataToSend={}) {
	let url = URL + endpoint
	let data = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': API_KEY
		},
	}
	if (method != 'GET') {
		data.data = dataToSend
	}
	const response = await fetch(url, data)

	return response.json()
}


export const api = {
	getCategories,
	getProducts,
	getShops,
	getShoppingLists,
	postProduct,
	postShoppingList,
};

const URL = '';
const API_KEY = process.env.VUE_APP_MOCKAROO_API_KEY;

// fetch https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// Using fetch https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// Jak uda sie pobrac dane, to trzeba pamietac o przeparsowaniu ich na jsona,
// powinno o tym byc pod ktoryms z tych linkow
// Promise https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// Trzeba pamietac o dodaniu lokalnie API KEY https://github.com/22-04-80/bai-daily-expense-organiser/wiki/Klucz-API-Mockaroo

// TODO wykorzystac fetch do zrobienia zapytania do API mockaroo uzywajac API i API_KEY
function performRequest(route, options) {
	console.log(route, options, URL, API_KEY)
	return Promise.resolve([{name: 'a', category: 'cat', price: 1}]); // placeholder
}

function getProducts() {
	// TODO przekazac do perform request odpowiednie parametry w taki sposob, zeby wykorzystac sciezke GET /"products" opisana przez Marcina
	return performRequest("/products", {method: 'GET'});
}

// TODO zaimplementowac i wyeksportowac funkcje wykorzystujace pozostale sciezki API

export const api = {
	getProducts,
};

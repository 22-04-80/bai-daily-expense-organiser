export function getRandomColors(counter) {
	let colors = [];
	for (let i = 0; i < counter; i++) {
		const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
		colors.push(`rgb(${randomBetween(0, 255)},${randomBetween(0, 255)},${randomBetween(0, 255)})`);
	}
	return colors;
}

export function prepareGroceriesHistoryChartData(data) {
	let chartData = getEmptyChartData();
	let groceriesHistoryMap = new Map();
	data.forEach((element) => {
		groceriesHistoryMap.set(
			element.list_name + ' ' + getDateAsString(element.created_at),
			calculateTotalPrice(element.products)
		);
	});

	chartData.labels = Array.from(groceriesHistoryMap.keys());
	chartData.datasets[0].label = "expenses"
	chartData.datasets[0].data = Array.from(groceriesHistoryMap.values());
	chartData.datasets[0].backgroundColor = getRandomColors(groceriesHistoryMap.size)[0];
	return chartData;
}

export function prepareProductsCountPerCategoryChartData(data) {
	let chartData = getEmptyChartData();
	let categoryProductCountMap = new Map();
	data.forEach((element) => {
		categoryProductCountMap.set(
			element.category,
			data.filter((v) => v.category == element.category).length
		);
	});

	chartData.labels = Array.from(categoryProductCountMap.keys());
	chartData.datasets[0].data = Array.from(categoryProductCountMap.values());
	chartData.datasets[0].backgroundColor = getRandomColors(categoryProductCountMap.size);
	return chartData;
}

export function prepareMostFrequentlyPurchasedChartData(data) {
	let allPurchasedProducts = data.map(e => {
		return e.products;
	}).flat();

	let chartData = getEmptyChartData();
	let mostFrequentlyPurchasedMap = new Map();
	allPurchasedProducts.forEach((element) => {
		mostFrequentlyPurchasedMap.set(
			element.name,
			sumPurchasedProductByQuantity(element, allPurchasedProducts)
		);
	});
	chartData.labels = Array.from(mostFrequentlyPurchasedMap.keys());
	chartData.datasets[0].label = "Quantity"
	chartData.datasets[0].data = Array.from(mostFrequentlyPurchasedMap.values());
	chartData.datasets[0].backgroundColor = getRandomColors(mostFrequentlyPurchasedMap.size)[0];
	chartData.datasets[0].borderColor = getRandomColors(mostFrequentlyPurchasedMap.size)[0];
	return chartData;
}

function sumPurchasedProductByQuantity(current, products) {
	return products
			.filter(i => i.name === current.name)
			.map(e => e.quantity)
			.reduce((a, b) => a + b);
}

function calculateTotalPrice(groceryProductsInfo) {
	let totalSum = 0;
	groceryProductsInfo.forEach(product => {
		totalSum += product.price * product.quantity;
	});

	return totalSum;
} 

export function getChartOptions(title) {
	return {
		title: {
			display: true,
			text: title,
			position: "top",
			fontSize: 32,
		},
		scales: {
			yAxes: {
				ticks: {
					beginAtZero: true,
					min: 0
				}
			},
		},
		legend: {
			labels: {
				fontSize: 12
			}
		}
	}
}

function getEmptyChartData() {
	return {
		labels: [],
		datasets: [
			{
				label: null,
				data: [],
				backgroundColor: [],
				borderColor: [],
				borderWidth: 1,
			},
		],
	};
}

function getDateAsString(timestamp) {
	return new Date(timestamp * 1000).toLocaleDateString("pl-PL");
}
export function filterByCategory(allProducts, category) {
	if (!category) {
		return [...allProducts];
	}
	return allProducts.filter((product) => product.category === category);
}

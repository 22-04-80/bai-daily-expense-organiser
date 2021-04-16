import {SORT_TYPE} from './sortType';

export function sortByPrice(products, sortType) {
	if (sortType === SORT_TYPE.DESCENDING) {
		products.sort((product1, product2) => {
			if (product1.price > product2.price) return -1;
			if (product1.price < product2.price) return 1;
			if (product1.price === product2.price) return 0;
		});
	}
	else if (sortType === SORT_TYPE.ASCENDING) {
		products.sort((product1, product2) => {
			if (product1.price > product2.price) return 1;
			if (product1.price < product2.price) return -1;
			if (product1.price === product2.price) return 0;
		});
	}
}

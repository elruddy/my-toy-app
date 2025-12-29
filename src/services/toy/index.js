const { DEV, VITE_LOCAL } = import.meta.env;

import { toyService as local } from './toy.service.local';
import { toyService as remote } from './toy.service.remote';

function getEmptyToy() {
	return {
		name: '',
		imgUrl:
			'https://www.herdy.co.uk/media/catalog/product/cache/a83355e9e934376662af35efc6557543/s/h/sheppy_soft_toy_front.jpg',
		price: '',
		labels: [],
		createdAt: Date().now,
		inStock: true,
		msgs: [],
	};
}

function getRandomToy() {
	return {
		name: '',
		imgUrl:
			'https://www.herdy.co.uk/media/catalog/product/cache/a83355e9e934376662af35efc6557543/s/h/sheppy_soft_toy_front.jpg',
		price: '',
		labels: [],
		createdAt: Date().now,
		inStock: true,
		msgs: [],
	};
}

function getDefaultFilter() {
	return { txt: '', maxPrice: '', inStock: 'All' };
}

const service = VITE_LOCAL === 'true' ? local : remote;
export const toyService = {
	getEmptyToy,
	getRandomToy,
	getDefaultFilter,
	...service,
};

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.toyService = toyService;

import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { userService } from './user.service.js';
import { httpService } from './http.service.js';

// import Axios from 'axios'
// const axios = Axios.create({
//     withCredentials: true
// })

// const BASE_URL = '/api/toy/'
//const BASE_URL = '//localhost:3030/api/toy/';

const BASE_URL = 'toy/';

export const toyService = {
	query,
	getById,
	save,
	remove,
	getEmptyToy,
	getDefaultFilter,
	getRandomToy,
};

function query(filterBy = {}) {
	return httpService.get(BASE_URL, filterBy);
}

function getById(toyId) {
	return httpService.get(BASE_URL + toyId);
}
function remove(toyId) {
	return httpService.delete(BASE_URL + toyId);
}

function save(toy) {
	if (toy._id) {
		return httpService.put(BASE_URL + toy._id, toy);
	} else {
		return httpService.post(BASE_URL, toy);
	}
}

function getEmptyToy() {
	return {
		name: '',
		imgUrl:
			'https://www.herdy.co.uk/media/catalog/product/cache/a83355e9e934376662af35efc6557543/s/h/sheppy_soft_toy_front.jpg',
		price: '',
		labels: [],
		createdAt: Date().now,
		inStock: true,
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
	};
}

function getDefaultFilter() {
	return { txt: '', maxPrice: '', inStock: 'All' };
}

// Toy data model
// const toy = {
// _id: 't101',
// name: 'Talking Doll',
// imgUrl: 'hardcoded-url-for-now'
// ,
// price: 123,
// labels: ['Doll', 'Battery Powered', 'Baby'],
// createdAt: 1631031801011,
// inStock: true,
// }

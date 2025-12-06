import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { userService } from './user.service.js';
import { httpService } from './http.service.js';

// import Axios from 'axios'
// const axios = Axios.create({
//     withCredentials: true
// })

// const BASE_URL = '/api/toy/'
// const BASE_URL = '//localhost:3030/api/toy/'

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
			'https://www.crossword.in/cdn/shop/products/crosswordonline-toys-games-default-title-mirada-55cm-jumbo-teddy-bear-soft-toy-beige-40250340016345.jpg?v=1746619255',
		price: '',
		labels: [],
		createdAt: Date().now,
		inStock: true,
	};
}

function getRandomToy() {
	return {
		vendor: 'Susita-' + (Date.now() % 1000),
		price: utilService.getRandomIntInclusive(1000, 9000),
		speed: utilService.getRandomIntInclusive(90, 200),
	};
}

function getDefaultFilter() {
	return { txt: '', maxPrice: '', inStock: '' };
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

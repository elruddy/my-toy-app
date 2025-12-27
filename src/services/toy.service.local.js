import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { userService } from './user.service.js';

const STORAGE_KEY = 'toyDB';

export const toyService = {
	query,
	getById,
	save,
	remove,
	getEmptyToy,
	getRandomToy,
	getDefaultFilter,
};

function query(filterBy = {}) {
	return storageService.query(STORAGE_KEY).then((toys) => {
		if (filterBy.txt) {
			const regExp = new RegExp(filterBy.txt, 'i');
			toys = toys.filter((toy) => regExp.test(toy.name));
		}

		if (filterBy.maxPrice) {
			toys = toys.filter((toy) => toy.price <= filterBy.maxPrice);
		}

		if (filterBy.inStock && filterBy.inStock !== 'All') {
			toys = toys.filter((toy) =>
				filterBy.inStock === 'In stock' ? toy.inStock : !toy.inStock
			);
		}

		if (filterBy.sort) {
			if (filterBy.sort === 'name') {
				toys = toys.sort((a, b) => a.name.localeCompare(b.name));
			} else if (filterBy.sort === 'createdAt') {
				toys = toys.sort(
					(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
				);
			} else if (filterBy.sort === 'price') {
				toys = toys.sort((a, b) => a.price - b.price);
			}
		}

		return toys;
	});
}

function getById(toyId) {
	return storageService.get(STORAGE_KEY, toyId);
}

function remove(toyId) {
	// return Promise.reject('Not now!')
	return storageService.remove(STORAGE_KEY, toyId);
}

function save(toy) {
	if (toy._id) {
		return storageService.put(STORAGE_KEY, toy);
	} else {
		// when switching to backend - remove the next line
		toy.owner = userService.getLoggedinUser();
		return storageService.post(STORAGE_KEY, toy);
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
	return { txt: '', maxPrice: '', inStock: 'All', sort: '' };
}

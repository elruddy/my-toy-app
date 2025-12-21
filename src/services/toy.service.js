// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js';
import { utilService } from './util.service.js';
import { userService } from './user.service.js';

const STORAGE_KEY = 'toy';

export const toyService = {
	query,
	getById,
	save,
	remove,
	getEmptyToy,
	addToyMsg,
	getDefaultFilter,
	getRandomToy,
};
window.cs = toyService;

async function query(filterBy = { txt: '', maxPrice: '', inStock: 'All' }) {
	return httpService.get(STORAGE_KEY, filterBy);

	// var cars = await storageService.query(STORAGE_KEY)
	// if (filterBy.txt) {
	//     const regex = new RegExp(filterBy.txt, 'i')
	//     cars = cars.filter(car => regex.test(car.vendor) || regex.test(car.description))
	// }
	// if (filterBy.price) {
	//     cars = cars.filter(car => car.price <= filterBy.price)
	// }
	// return cars
}
function getById(toyId) {
	// return storageService.get(STORAGE_KEY, carId)
	return httpService.get(`toy/${toyId}`);
}

async function remove(toyId) {
	// await storageService.remove(STORAGE_KEY, carId)
	return httpService.delete(`toy/${toyId}`);
}
async function save(toy) {
	var savedToy;
	if (toy._id) {
		// savedCar = await storageService.put(STORAGE_KEY, car)
		savedToy = await httpService.put(`toy/${toy._id}`, toy);
	} else {
		// Later, owner is set by the backend
		// car.owner = userService.getLoggedinUser()
		// savedCar = await storageService.post(STORAGE_KEY, car)
		savedToy = await httpService.post('toy', toy);
	}
	return savedToy;
}

async function addToyMsg(toyId, txt) {
	// const car = await getById(carId)
	// if (!car.msgs) car.msgs = []

	// const msg = {
	//     id: utilService.makeId(),
	//     by: userService.getLoggedinUser(),
	//     txt
	// }
	// car.msgs.push(msg)
	// await storageService.put(STORAGE_KEY, car)
	const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt });
	return savedMsg;
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

import { storageService } from '../async-storage.service';
import { userService } from '../user';
import { toyService } from '../toy';

export const reviewService = {
	query,
	add,
	remove,
};

function query(filterBy = {}) {
	return storageService.query('review');
}

async function remove(reviewId) {
	await storageService.remove('review', reviewId);
}

async function add({ txt, aboutToyId }) {
	const aboutToy = await toyService.getById(aboutToyId);

	const reviewToAdd = {
		txt,
		byUser: userService.getLoggedinUser(),
		aboutToy: {
			_id: aboutToy._id,
			name: aboutToy.name,
			price: aboutToy.price,
		},
	};

	//reviewToAdd.byUser.score += 10;
	await userService.updateScore(reviewToAdd.byUser);

	const addedReview = await storageService.post('review', reviewToAdd);
	return addedReview;
}

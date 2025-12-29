import { httpService } from '../http.service';

export const reviewService = {
	query,
	add,
	remove,
};

function query(filterBy = {}) {
	return httpService.get(`review`, filterBy);
}

async function remove(reviewId) {
	await httpService.delete(`review/${reviewId}`);
}

async function add({ txt, aboutToyId }) {
	return await httpService.post(`review`, { txt, aboutToyId });
}

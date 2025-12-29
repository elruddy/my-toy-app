const { DEV, VITE_LOCAL } = import.meta.env;

import { reviewService as local } from './review.service.local';
import { reviewService as remote } from './review.service.remote';

const service = VITE_LOCAL === 'true' ? local : remote;
export const reviewService = {
	...service,
};

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.reviewService = reviewService;

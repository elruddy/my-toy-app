import { userService } from '../../services/user';

//* User
export const SET_USER = 'SET_USER';
export const SET_USER_SCORE = 'SET_USER_SCORE';
export const SET_USERS = 'SET_USERS';

const initialState = {
	count: 105,
	users: [],
	loggedInUser: userService.getLoggedinUser(),
};

export function userReducer(state = initialState, action = {}) {
	switch (action.type) {
		//* User
		case SET_USER:
			return {
				...state,
				loggedInUser: action.user,
			};
		case SET_USER_SCORE:
			const loggedInUser = { ...state.loggedInUser, score: action.score };
			return { ...state, loggedInUser };

		case SET_USERS:
			newState = { ...state, users: action.users };
			break;

		default:
			return state;
	}
}

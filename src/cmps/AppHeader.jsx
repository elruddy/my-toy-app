import { UserMsg } from './UserMsg.jsx';
import { LoginSignup } from './LoginSignup.jsx';
import { userService } from '../services/user.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { logout } from '../store/actions/user.actions.js';
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ShoppingCart } from './ShoppingCart.jsx';

// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
	const dispatch = useDispatch();
	const user = useSelector((storeState) => storeState.userModule.loggedInUser);
	// //console.log('user:', user)
	const isCartShown = useSelector(
		(storeState) => storeState.toyModule.isCartShown
	);

	function onLogout() {
		logout()
			.then(() => {
				showSuccessMsg('logout successfully');
			})
			.catch((err) => {
				showErrorMsg('OOPs try again');
			});
	}

	function onToggleCart(ev) {
		ev.preventDefault();
		dispatch({ type: TOGGLE_CART_IS_SHOWN });
		//console.log(isCartShown);
	}

	return (
		<header className="app-header full main-layout">
			<section className="header-container">
				<h1>React Toy Apps</h1>
				<nav className="app-nav">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/toy">Toys</NavLink>
					<NavLink to="/stores">Stores</NavLink>
					<NavLink to="/dashboard">Dashboard</NavLink>

					<a onClick={onToggleCart} href="#">
						🛒 Cart
					</a>
				</nav>
			</section>
			{user ? (
				<section>
					<NavLink to={`/user/${user._id}`}>
						Hello {user.fullname}{' '}
						<span> your cash is ${user.score.toLocaleString()}</span>
					</NavLink>
					<button onClick={onLogout}>Logout</button>
				</section>
			) : (
				<section>
					<LoginSignup />
				</section>
			)}
			<ShoppingCart isCartShown={isCartShown} />
			<UserMsg />
		</header>
	);
}

import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_BY } from '../store/reducers/user.reducer.js';
import { useState } from 'react';

//import logoImg from "../assets/img/logo.png"

// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux

export function HomePage() {
	return (
		<section>
			<h1> Welcome to Toys store </h1>
			<img
				src="./toys.webp"
				style={{ marginInline: '30vw' }}
				height="500"
			/>{' '}
		</section>
	);
}

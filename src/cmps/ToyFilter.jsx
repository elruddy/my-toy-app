// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from 'react';
import { utilService } from '../services/util.service.js';

export function ToyFilter({ filterBy, onSetFilter }) {
	const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
	onSetFilter = useRef(utilService.debounce(onSetFilter, 300));

	useEffect(() => {
		onSetFilter.current(filterByToEdit);
	}, [filterByToEdit]);

	function handleChange({ target }) {
		const field = target.name;
		let value = target.value;

		switch (target.type) {
			case 'number':
			case 'range':
				value = +value || '';
				break;

			case 'checkbox':
				value = target.checked;
				break;

			default:
				break;
		}
		setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
	}

	return (
		<section className="toy-filter full main-layout">
			<h2>Toys Filter</h2>
			<form>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					name="txt"
					placeholder="By name"
					value={filterByToEdit.txt}
					onChange={handleChange}
				/>

				<label htmlFor="maxPrice">Max price:</label>
				<input
					type="number"
					id="maxPrice"
					name="maxPrice"
					placeholder="By max price"
					value={filterByToEdit.maxPrice || ''}
					onChange={handleChange}
				/>
				<label htmlFor="inStock">
					Toy in stock ?
					<select
						value={filterByToEdit.inStock}
						//className="flex justify-center align-center"
						name="inStock"
						onChange={(ev) => handleChange(ev)}
					>
						<option value="All">All</option>
						<option value="In stock" defaultValue>
							In Stock
						</option>
						<option value="Out of stock">Out of Stock</option>
					</select>
				</label>
			</form>
		</section>
	);
}

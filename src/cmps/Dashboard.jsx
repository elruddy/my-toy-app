import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { loadToys } from '../store/actions/toy.actions.js';
import { useEffect, useState } from 'react';
import { toyService } from '../services/toy.service.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
	const [toys, setToys] = useState([]);
	// const [inventory, setInventory] = useState({});

	// useEffect(() => {
	// 	toyService.query().then((toys) => {
	// 		setToys(toys);
	// 		console.log(toys);
	// 		const inv = getInventoryByLabel(toys);
	// 		setInventory(inv);
	// 		console.log('Inventory:', inv);
	// 	});
	// }, []);

	toyService.query().then((toys) => {
		setToys(toys);
	});
	console.log('toys', toys);
	const inv = getInventoryByLabel(toys);

	function getInventoryByLabel(toys) {
		const inventory = {};
		toys.forEach((toy) => {
			if (!toy.inStock) return;

			toy.labels?.forEach((label) => {
				if (!inventory[label]) inventory[label] = 0;
				inventory[label]++;
			});
		});
		return inventory;
	}

	const data = {
		labels: Object.keys(inv).map((label) => label.toUpperCase()),
		datasets: [
			{
				label: '# of toys in stock',
				data: Object.values(inv),
				backgroundColor: [
					'rgba(255, 99, 133, 1)',
					'rgba(54, 163, 235, 1)',
					'rgba(255, 207, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 64, 201, 1)',
					'rgba(64, 255, 140, 1)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 64, 201, 1)',
					'rgba(64, 255, 140, 1)',
				],
				borderWidth: 1,
			},
		],
	};
	return (
		<section>
			<h1> Dashboard</h1>
			<section style={{ width: '25vw', margin: '10px' }}>
				<h3> Inventory by Label</h3>
				<Doughnut data={data}></Doughnut>
			</section>
		</section>
	);
}

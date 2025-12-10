import { useEffect, useState } from 'react';
import { toyService } from '../services/toy.service.js';
import { PopUp } from '../cmps/PopUp.jsx';
import { Chat } from '../cmps/Chat.jsx';
import { Link, useParams } from 'react-router-dom';

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM

export function ToyDetails() {
	const [toy, setToy] = useState(null);
	const [isChatOpen, setIsChatOpen] = useState(false);
	const { toyId } = useParams();

	useEffect(() => {
		if (toyId) loadToy();
	}, [toyId]);

	function loadToy() {
		toyService
			.getById(toyId)
			.then((toy) => setToy(toy))
			.catch((err) => {
				//console.log('Had issues in toy details', err);
				navigate('/toy');
			});
	}
	if (!toy) return <div>Loading...</div>;
	return (
		<section className="toy-details">
			<h1>Toy name : {toy.name}</h1>
			<h5>Price: ${toy.price}</h5>
			<img src={toy.imgUrl} style={{ width: '300px', height: 'auto' }} />{' '}
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas
				cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat
				perferendis tempora aspernatur sit, explicabo veritatis corrupti
				perspiciatis repellat, enim quibusdam!
			</p>
			<Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
			<Link to={`/toy`}>Back</Link>
			<p>
				<Link to="/toy/nJ5L4">Next Toy</Link>
			</p>
			{!isChatOpen && (
				<button onClick={() => setIsChatOpen(true)} className="chat-button">
					{' '}
					Open chat
				</button>
			)}
			<section>
				<PopUp
					header={<h2>Your chat about {toy.name}</h2>}
					footer={<footer>Toy price:{toy.price}</footer>}
					onClose={() => setIsChatOpen(false)}
					isOpen={isChatOpen}
				>
					{' '}
					<Chat />
				</PopUp>
			</section>
		</section>
	);
}

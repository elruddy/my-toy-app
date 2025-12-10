import { useRef, useState, useEffect } from 'react';
import { utilService } from '../services/util.service';

export function Chat() {
	const [msgs, setMsgs] = useState([]);
	const [userInput, setUserInput] = useState('');
	const msgsRef = useRef();

	useEffect(() => {
		if (msgsRef.current) {
			msgsRef.current.scrollTo({
				top: msgsRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}
	}, [msgs]);

	function addMsg(text, from) {
		const newMsg = {
			id: utilService.makeId(),
			text,
			from,
			sentAt: new Date(),
		};
		setMsgs((prevMsgs) => [...prevMsgs, newMsg]);
	}

	const handleSubmit = (ev) => {
		ev.preventDefault();
		let value = userInput.trim();
		if (!value) return;

		addMsg(value, 'user');

		setTimeout(() => {
			addMsg(`Happy to help you`, 'Support');
		}, 1000);

		setUserInput('');
	};

	return (
		<div className="chat-container ">
			<div ref={msgsRef} className="chat-messages">
				{msgs.map((msg) => (
					<div
						key={msg.id}
						className={`message ${msg.from === 'user' ? 'user' : 'other'}`}
					>
						<section>
							<span className="timestamp">
								{msg.sentAt.toLocaleTimeString()}
							</span>
							<h3>{msg.from === 'user' ? 'You' : msg.from}: </h3>
						</section>
						<p>{msg.text}</p>
					</div>
				))}
			</div>

			<form onSubmit={handleSubmit} className="chatinput-form">
				<input
					type="text"
					name="user-msg"
					id="user-msg"
					value={userInput}
					onChange={(ev) => setUserInput(ev.target.value)}
					placeholder="Type your message..."
				/>
			</form>
		</div>
	);
}

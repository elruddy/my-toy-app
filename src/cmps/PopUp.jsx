export function PopUp({
	children,
	header,
	footer,
	isOpen = false,
	onClose = () => {},
}) {
	return (
		<div onClick={onClose} className="popup-backdrop">
			<div onClick={(ev) => ev.stopPropagation()} className="popup-container">
				{header && <header className="popup-header">{header}</header>}
				<main className="popup-main">{children}</main>
				{footer && <footer className="popup-footer">{footer}</footer>}
			</div>
		</div>
	);
}

import {
	APIProvider,
	Map,
	AdvancedMarker,
	InfoWindow,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';

export function StoreMap() {
	const [coords, setCoords] = useState({ lat: 31.418388, lng: 35.073541 });
	const [selectedMarkerId, setSelectedMarkerId] = useState(null);

	const zoom = 7;

	const markerData = [
		{
			id: 'JLM',
			position: { lat: 31.769, lng: 35.2163 },
			title: 'JLM',
			emoji: '🏰',
		},
		{
			id: 'TLV',
			position: { lat: 32.109333, lng: 34.855499 },
			title: 'TLV',
			emoji: '🎡',
		},
	];

	// Add refs for each marker
	const markersWithRefs = markerData.map((m) => {
		const [markerRef, marker] = useAdvancedMarkerRef();
		return { ...m, markerRef, marker };
	});

	function handleClick(ev) {
		setCoords(ev.detail.latLng);
		ev.map.panTo(ev.detail.latLng);
	}

	return (
		<section className="google-map">
			<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<Map
					mapId="store-map"
					defaultZoom={zoom}
					defaultCenter={coords}
					disableDefaultUI={true}
					onClick={handleClick}
				>
					{markersWithRefs.map((m) => (
						<AdvancedMarker
							key={m.id}
							position={m.position}
							title={m.title}
							ref={m.markerRef}
							onClick={() =>
								setSelectedMarkerId((current) =>
									current === m.id ? null : m.id
								)
							}
						>
							<div style={{ fontSize: '2rem' }}>{m.emoji}</div>

							{selectedMarkerId === m.id && (
								<InfoWindow
									onCloseClick={() => setSelectedMarkerId(null)}
									anchor={m.marker}
								>
									<h5>This is our store in {m.title}</h5>
								</InfoWindow>
							)}
						</AdvancedMarker>
					))}
				</Map>
			</APIProvider>
		</section>
	);
}

"use client";

import { useEffect, useState } from "react";

type Destination = {
	icon: string;
	title: string;
	summary: string;
	badge?: string;
	rating: string;
	details: string;
};

const DESTINATIONS: Destination[] = [
	{
		icon: "🏝️",
		title: "Bali, Indonesia",
		summary: "Beaches, temples, and lush rice terraces.",
		badge: "Trending",
		rating: "★★★★☆",
		details:
			"Experience Ubud's rice terraces, Uluwatu cliffs, and vibrant markets. Optional snorkeling at Nusa Penida and sunrise trek at Mount Batur.",
	},
	{
		icon: "🗼",
		title: "Paris, France",
		summary: "Art, cuisine, and timeless architecture.",
		rating: "★★★★☆",
		details:
			"Explore the Louvre and Musée d'Orsay, stroll along the Seine, and savor patisserie delights in Montmartre. Evening Seine cruise included.",
	},
	{
		icon: "🦁",
		title: "Maasai Mara, Kenya",
		summary: "Safari adventures and the Great Migration.",
		rating: "★★★★★",
		details:
			"Daily game drives with expert guides. Spot the Big Five and witness the Mara River crossings (seasonal). Night sky viewing from camp.",
	},
	{
		icon: "🏔️",
		title: "Swiss Alps, Switzerland",
		summary: "Snow-capped peaks and scenic trains.",
		rating: "★★★★★",
		details:
			"Ride the Glacier Express, wander Lauterbrunnen Valley, and take a cable car to panoramic viewpoints. Optional beginner ski day.",
	},
];

export default function Destinations() {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState<Destination | null>(null);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, []);

	function show(dest: Destination) {
		setActive(dest);
		setOpen(true);
	}

	function close() {
		setOpen(false);
		setTimeout(() => setActive(null), 200);
	}

	return (
		<>
			<div className="row g-4">
				{DESTINATIONS.map((d) => (
					<div key={d.title} className="col-sm-6 col-lg-3">
						<button
							onClick={() => show(d)}
							className="card h-100 text-start border-0 shadow-sm hover-shadow h-100"
							style={{transition: 'box-shadow 0.3s ease'}}
						>
							<div className="card-body position-relative">
								{d.badge ? (
									<span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3">{d.badge}</span>
								) : null}
								<div className="display-6 mb-3">{d.icon}</div>
								<h5 className="card-title fw-semibold mb-2">{d.title}</h5>
								<p className="card-text text-muted small">{d.summary}</p>
								<div className="mt-3 small text-muted">Rating: {d.rating}</div>
							</div>
						</button>
					</div>
				))}
			</div>

			{open && active && (
				<div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} onClick={close}>
					<div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
						<div className="modal-content">
							<div className="modal-header">
								<div className="d-flex align-items-center gap-3">
									<div className="display-6">{active.icon}</div>
									<div>
										<h5 className="modal-title mb-0">{active.title}</h5>
										<small className="text-muted">Rating: {active.rating}</small>
									</div>
								</div>
								<button type="button" className="btn-close" onClick={close}></button>
							</div>
							<div className="modal-body">
								<p className="text-muted">
									{active.details}
								</p>
							</div>
							<div className="modal-footer">
								<a href="#tours" className="btn btn-primary">See related tours</a>
								<button className="btn btn-secondary" onClick={close}>Close</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}



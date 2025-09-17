"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SearchItem = {
	label: string;
	section: string;
	href: string;
	description?: string;
};

const ITEMS: SearchItem[] = [
	{ label: "Bali, Indonesia", section: "Destinations", href: "#destinations", description: "Beaches, temples, rice terraces" },
	{ label: "Paris, France", section: "Destinations", href: "#destinations", description: "Art, cuisine, architecture" },
	{ label: "Maasai Mara, Kenya", section: "Destinations", href: "#destinations", description: "Safari, Great Migration" },
	{ label: "Swiss Alps, Switzerland", section: "Destinations", href: "#destinations", description: "Peaks, scenic trains" },

	{ label: "City Explorer", section: "Tours", href: "#tours", description: "5 days of museums, markets, food" },
	{ label: "Island Retreat", section: "Tours", href: "#tours", description: "7 days beach + snorkeling" },
	{ label: "Safari Adventure", section: "Tours", href: "#tours", description: "6 days game drives" },

	{ label: "Weekend Getaway", section: "Packages", href: "#packages", description: "2 nights city break" },
	{ label: "Family Bundle", section: "Packages", href: "#packages", description: "4 nights resort + activities" },
	{ label: "Honeymoon", section: "Packages", href: "#packages", description: "7 nights romantic escape" },

	{ label: "Contact email", section: "Contact", href: "#contact", description: "hello@tour.example" },
	{ label: "Contact phone", section: "Contact", href: "#contact", description: "+1 (555) 123-4567" },
];

export default function Search() {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const results = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return [] as SearchItem[];
		return ITEMS.filter((item) =>
			[item.label, item.section, item.description ?? ""].some((t) => t.toLowerCase().includes(q))
		).slice(0, 8);
	}, [query]);

	useEffect(() => {
		function onDocClick(e: MouseEvent) {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("click", onDocClick);
		return () => document.removeEventListener("click", onDocClick);
	}, []);

	useEffect(() => {
		setActiveIndex(0);
	}, [query]);

	function select(index: number) {
		const item = results[index];
		if (!item) return;
		if (item.href.startsWith("http")) {
			window.open(item.href, "_blank", "noopener,noreferrer");
		} else {
			window.location.hash = item.href.replace(/^#/, "");
		}
		setOpen(false);
	}

	function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (!open && (e.key === "ArrowDown" || e.key === "Enter") && results.length > 0) {
			setOpen(true);
			return;
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((i) => (i + 1) % results.length);
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((i) => (i - 1 + results.length) % results.length);
		}
		if (e.key === "Enter") {
			if (results.length > 0) select(activeIndex);
		}
		if (e.key === "Escape") {
			setOpen(false);
		}
	}

	return (
		<div ref={containerRef} className="position-relative">
			<div className="input-group">
				<span className="input-group-text bg-transparent border-end-0">
					<i className="bi bi-search"></i>
				</span>
				<input
					ref={inputRef}
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						setOpen(e.target.value.trim().length > 0);
					}}
					onKeyDown={onKeyDown}
					className="form-control border-start-0"
					placeholder="Search destinations, tours..."
					aria-label="Search"
					type="search"
				/>
			</div>

			{open && results.length > 0 && (
				<ul role="listbox" className="position-absolute w-100 mt-2 rounded border bg-white shadow-lg overflow-hidden" style={{zIndex: 1050}}>
					{results.map((item, idx) => (
						<li key={`${item.section}-${item.label}`}
							role="option"
							aria-selected={idx === activeIndex}
							className={`px-3 py-2 cursor-pointer ${idx === activeIndex ? "bg-primary text-white" : ""}`}
							onMouseEnter={() => setActiveIndex(idx)}
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => select(idx)}
						>
							<div className="small fw-medium d-flex align-items-center gap-2">
								<span className={idx === activeIndex ? "text-white-50" : "text-muted"}>{item.section}</span>
								<span>•</span>
								<span>{item.label}</span>
							</div>
							{item.description && (
								<p className="small text-muted mt-1 mb-0">{item.description}</p>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}



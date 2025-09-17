"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
	{ id: "home", label: "Home", icon: "🏠", href: "#home" },
	{ id: "about", label: "About", icon: "ℹ️", href: "#about" },
	{ id: "destinations", label: "Destinations", icon: "🌍", href: "/destinations" },
	{ id: "navigate", label: "Navigate", icon: "🧭", href: "/navigate" },
	{ id: "tours", label: "Tours", icon: "🎒", href: "#tours" },
	{ id: "packages", label: "Packages", icon: "📦", href: "#packages" },
	{ id: "services", label: "Services", icon: "🛠️", href: "#services" },
	{ id: "gallery", label: "Gallery", icon: "📸", href: "#gallery" },
	{ id: "contact", label: "Contact", icon: "📞", href: "#contact" },
];

// Dropdown menu items
const DROPDOWN_ITEMS = {
	services: [
		{ label: "Travel Planning", icon: "📋", href: "#planning" },
		{ label: "Custom Tours", icon: "🎯", href: "#custom" },
		{ label: "Group Travel", icon: "👥", href: "#group" },
		{ label: "Luxury Travel", icon: "💎", href: "#luxury" },
		{ label: "Adventure Tours", icon: "🏔️", href: "#adventure" },
	],
	destinations: [
		{ label: "Europe", icon: "🏛️", href: "#europe" },
		{ label: "Asia", icon: "🗾", href: "#asia" },
		{ label: "Africa", icon: "🦁", href: "#africa" },
		{ label: "Americas", icon: "🗽", href: "#americas" },
		{ label: "Oceania", icon: "🦘", href: "#oceania" },
	],
};

export default function HeaderNav() {
	const [active, setActive] = useState<string>("home");
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActive(entry.target.id);
					}
				});
			},
			{ root: null, rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.5, 1] }
		);
		SECTIONS.forEach((s) => {
			const el = document.getElementById(s.id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, []);

	const handleDropdownToggle = (sectionId: string) => {
		setOpenDropdown(openDropdown === sectionId ? null : sectionId);
	};

	const handleDropdownClose = () => {
		setOpenDropdown(null);
	};

	return (
		<ul className="navbar-nav me-auto">
			{SECTIONS.map((section) => {
				const hasDropdown = DROPDOWN_ITEMS[section.id as keyof typeof DROPDOWN_ITEMS];
				
				return (
					<li key={section.id} className={`nav-item ${hasDropdown ? 'dropdown' : ''}`}>
						{hasDropdown ? (
							<>
								<a
									href={section.href}
									className={`nav-link dropdown-toggle ${active === section.id ? "active fw-semibold" : ""}`}
									onClick={(e) => {
										e.preventDefault();
										handleDropdownToggle(section.id);
									}}
									onMouseEnter={() => setOpenDropdown(section.id)}
								>
									<span className="nav-icon">{section.icon}</span>
									<span className="nav-text">{section.label}</span>
								</a>
								<div 
									className={`dropdown-menu advanced-dropdown ${openDropdown === section.id ? 'show' : ''}`}
									onMouseLeave={handleDropdownClose}
								>
									{DROPDOWN_ITEMS[section.id as keyof typeof DROPDOWN_ITEMS]?.map((item) => (
										<a key={item.label} href={item.href} className="dropdown-item">
											<span className="dropdown-icon">{item.icon}</span>
											<span className="dropdown-text">{item.label}</span>
										</a>
									))}
								</div>
							</>
						) : (
							<a
								href={section.href}
								className={`nav-link ${active === section.id ? "active fw-semibold" : ""}`}
							>
								<span className="nav-icon">{section.icon}</span>
								<span className="nav-text">{section.label}</span>
							</a>
						)}
					</li>
				);
			})}
		</ul>
	);
}



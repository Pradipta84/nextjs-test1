"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
	if (typeof window === "undefined") return "light";
	const stored = window.localStorage.getItem("theme");
	if (stored === "light" || stored === "dark") return stored;
	return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		const initial = getPreferredTheme();
		applyTheme(initial);
		setTheme(initial);
	}, []);

	function applyTheme(next: Theme) {
		const root = document.documentElement;
		root.setAttribute("data-theme", next);
		root.classList.toggle("dark", next === "dark");
		window.localStorage.setItem("theme", next);
	}

	function toggle() {
		const next: Theme = theme === "dark" ? "light" : "dark";
		applyTheme(next);
		setTheme(next);
	}

	return (
		<button
			type="button"
			title="Toggle theme"
			onClick={toggle}
			className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
			style={{width: '40px', height: '40px'}}
		>
			{theme === "dark" ? (
				<i className="bi bi-moon-fill"></i>
			) : (
				<i className="bi bi-sun-fill"></i>
			)}
		</button>
	);
}



"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// Only respect an explicit user choice; default to light
function getPreferredTheme(): Theme {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored as Theme;
    return "light";
}

export default function ThemeToggle() {
	// Theme toggle disabled - force light theme only
	useEffect(() => {
		const root = document.documentElement;
		root.setAttribute("data-theme", "light");
		root.classList.remove("dark");
		window.localStorage.setItem("theme", "light");
	}, []);

	return (
		<button
			type="button"
			title="Light theme only"
			className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
			style={{width: '40px', height: '40px'}}
			disabled
		>
			<i className="bi bi-sun-fill"></i>
		</button>
	);
}



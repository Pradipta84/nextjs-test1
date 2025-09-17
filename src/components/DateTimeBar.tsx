"use client";

import { useEffect, useRef, useState } from "react";

function formatDate(now: Date): string {
	const day = String(now.getDate()).padStart(2, "0");
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthNames[now.getMonth()];
	const year = now.getFullYear();
	return `${day}-${month}-${year}`;
}

function formatTime(now: Date): { hours: string; minutes: string; seconds: string; ampm: string } {
	let hours = now.getHours();
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	if (hours === 0) hours = 12;
	return {
		hours: String(hours).padStart(2, "0"),
		minutes,
		seconds,
		ampm
	};
}

function formatWeekday(now: Date): string {
	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return weekdays[now.getDay()];
}

export default function DateTimeBar() {
	const [now, setNow] = useState<Date>(() => new Date());
	const [temperatureC, setTemperatureC] = useState<number | null>(null);
	const [tempLoading, setTempLoading] = useState<boolean>(true);

	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(id);
	}, []);

	useEffect(() => {
		let cancelled = false;

		async function fetchTemp(lat: number, lon: number) {
			try {
				const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
				if (!res.ok) throw new Error("weather fetch failed");
				const data = await res.json();
				if (!cancelled) {
					const t = data?.current_weather?.temperature;
					setTemperatureC(typeof t === "number" ? Math.round(t) : null);
				}
			} catch (e) {
				if (!cancelled) setTemperatureC(null);
			} finally {
				if (!cancelled) setTempLoading(false);
			}
		}

		if (typeof navigator !== "undefined" && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					fetchTemp(pos.coords.latitude, pos.coords.longitude);
				},
				() => {
					// Fallback: London
					fetchTemp(51.5074, -0.1278);
				},
				{ enableHighAccuracy: false, timeout: 5000 }
			);
		} else {
			fetchTemp(51.5074, -0.1278);
		}

		return () => { cancelled = true; };
	}, []);

	const date = formatDate(now);
	const time = formatTime(now);
	const weekday = formatWeekday(now);

	return (
		<div className="w-100">
			<div className="card border-0 bg-light">
				<div className="card-body py-3">
					<div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 gap-md-4 text-center">
						<span className="badge bg-primary fs-6">{date}</span>
						
						<div className="d-none d-md-block text-muted">|</div>
						
						{/* Flip Clock */}
						<div className="flip-clock flip-compat d-flex align-items-center">
							<FlipPiece value={time.hours} />
							<span className="flip-separator mx-2 text-muted">:</span>
							<FlipPiece value={time.minutes} />
							<span className="flip-separator mx-2 text-muted">:</span>
							<FlipPiece value={time.seconds} />
							<span className="badge bg-secondary ms-2">{time.ampm}</span>
						</div>
						
						<div className="d-none d-md-block text-muted">|</div>
						
						<span className="badge bg-info fs-6" aria-live="polite">
							🌡️ {tempLoading ? "--" : (temperatureC !== null ? `${temperatureC}°C` : "N/A")}
						</span>

						<div className="d-none d-md-block text-muted">|</div>
						
						<span className="badge bg-success fs-6">{weekday}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

type FlipPieceProps = { value: string };

function FlipPiece({ value }: FlipPieceProps) {
	const [flip, setFlip] = useState(false);
	const previous = useRef<string>(value);

	useEffect(() => {
		if (value !== previous.current) {
			setFlip(true);
			const t = setTimeout(() => {
				setFlip(false);
				previous.current = value;
			}, 650);
			return () => clearTimeout(t);
		}
	}, [value]);

	return (
		<div className="flip-clock__piece">
			<div className={`card${flip ? " flip" : ""}`}>
				<div className="card__back" data-value={previous.current}>
					<div className="card__bottom" data-value={previous.current}></div>
				</div>
				<div className="card__top" aria-hidden>{value}</div>
				<div className="card__bottom" data-value={value}></div>
			</div>
		</div>
	);
}



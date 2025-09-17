"use client";

import { useEffect, useState } from "react";

export default function NetworkStatus() {
	const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true);

	useEffect(() => {
		function handleOnline() { setIsOnline(true); }
		function handleOffline() { setIsOnline(false); }
		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);
		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	return (
		<div className="d-flex align-items-center gap-2 small opacity-75" aria-live="polite" title={isOnline ? "Online" : "Offline"}>
			<span className={`badge rounded-pill ${isOnline ? "bg-success" : "bg-danger"}`} style={{width: '8px', height: '8px'}}></span>
			<span className="d-none d-sm-inline">{isOnline ? "Online" : "Offline"}</span>
		</div>
	);
}



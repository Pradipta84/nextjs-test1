import ThemeToggle from "../../components/ThemeToggle";
import NetworkStatus from "../../components/NetworkStatus";

export default function GetStartedPage() {
	return (
		<div className="w-full mx-auto section section-lg get-started">
			<div className="w-full max-w-screen-xl mx-auto mb-4 flex items-center justify-end gap-3">
				<NetworkStatus />
				<ThemeToggle />
			</div>
			{/* Hero */}
			<section className="relative w-full max-w-screen-xl mx-auto overflow-hidden fade-in">
				<div className="blob blob-1" aria-hidden></div>
				<div className="blob blob-2" aria-hidden></div>
				<h1 className="gradient-text text-3xl sm:text-5xl font-semibold tracking-tight mb-3">Get started</h1>
				<p className="text-muted-foreground max-w-[70ch] mb-6">
					Kick off your journey with a quick onboarding. Connect preferences, explore featured tours,
					and personalize recommendations with smooth, delightful animations.
				</p>
				<div className="flex gap-3 flex-wrap">
					<a href="#onboarding" className="btn btn-primary ring-focus">Start onboarding</a>
					<a href="/" className="btn btn-outline ring-focus">Back home</a>
				</div>
			</section>

			{/* Onboarding Steps */}
			<section id="onboarding" className="w-full max-w-screen-xl mx-auto mt-10">
				<h2 className="text-2xl font-semibold tracking-tight mb-4">Quick steps</h2>
				<ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger">
					<li className="card p-4">
						<div className="badge mb-2">1</div>
						<div className="font-medium mb-1">Tell us your vibe</div>
						<p className="text-sm text-muted-foreground">Beach, city, nature — pick what excites you.</p>
					</li>
					<li className="card p-4">
						<div className="badge mb-2">2</div>
						<div className="font-medium mb-1">Set dates & budget</div>
						<p className="text-sm text-muted-foreground">Flexible or fixed — we adapt recommendations.</p>
					</li>
					<li className="card p-4">
						<div className="badge mb-2">3</div>
						<div className="font-medium mb-1">Get curated picks</div>
						<p className="text-sm text-muted-foreground">Instant itineraries ready to book or tweak.</p>
					</li>
				</ol>
			</section>

			{/* Features with motion */}
			<section className="w-full max-w-screen-xl mx-auto mt-12">
				<h2 className="text-2xl font-semibold tracking-tight mb-4">Why you’ll love it</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="rounded-2xl border p-6 bg-muted card-hover shimmer">
						<div className="text-2xl mb-2">✨</div>
						<div className="font-semibold mb-1">Beautiful, fast UI</div>
						<p className="text-sm text-muted-foreground">Polished interactions with subtle motion that never gets in the way.</p>
					</div>
					<div className="rounded-2xl border p-6 bg-foreground text-background relative overflow-hidden card-hover float">
						<div className="text-2xl mb-2">🧭</div>
						<div className="font-semibold mb-1">Smart suggestions</div>
						<p className="text-sm opacity-85">AI-assisted picks tuned to your travel style and constraints.</p>
					</div>
					<div className="rounded-2xl border p-6 bg-muted card-hover tilt">
						<div className="text-2xl mb-2">🧳</div>
						<div className="font-semibold mb-1">Plan to book</div>
						<p className="text-sm text-muted-foreground">Go from shortlist to finalized itinerary in minutes.</p>
					</div>
				</div>
			</section>

			{/* Quick Stats */}
			<section className="w-full max-w-screen-xl mx-auto mt-12">
				<h2 className="text-2xl font-semibold tracking-tight mb-4">At a glance</h2>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center stagger">
					<div className="card p-4 shadow-animated shadow-pulse hover-lift-strong accent-cycle">
						<div className="text-3xl font-bold">1k+</div>
						<div className="text-sm text-muted-foreground">Destinations</div>
					</div>
					<div className="card p-4 shadow-animated shadow-pulse hover-lift-strong accent-cycle">
						<div className="text-3xl font-bold">4.8★</div>
						<div className="text-sm text-muted-foreground">Avg. rating</div>
					</div>
					<div className="card p-4 shadow-animated shadow-pulse hover-lift-strong accent-cycle">
						<div className="text-3xl font-bold">24/7</div>
						<div className="text-sm text-muted-foreground">Travel support</div>
					</div>
					<div className="card p-4 shadow-animated shadow-pulse hover-lift-strong accent-cycle">
						<div className="text-3xl font-bold">0 fees</div>
						<div className="text-sm text-muted-foreground">Hidden charges</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="w-full max-w-screen-xl mx-auto mt-12">
				<h2 className="text-2xl font-semibold tracking-tight mb-4">What travelers say</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<blockquote className="rounded-2xl border p-6 bg-muted card-hover">
						<p>“The suggestions were spot on — we discovered places we’d never have found.”</p>
						<footer className="mt-3 text-sm text-muted-foreground">Alex, City Explorer</footer>
					</blockquote>
					<blockquote className="rounded-2xl border p-6 bg-muted card-hover">
						<p>“Planning went from stressful to fun. The animations are a delight!”</p>
						<footer className="mt-3 text-sm text-muted-foreground">Priya, Family Traveler</footer>
					</blockquote>
					<blockquote className="rounded-2xl border p-6 bg-muted card-hover">
						<p>“Booked our honeymoon in minutes. Highly recommend.”</p>
						<footer className="mt-3 text-sm text-muted-foreground">Liam, Honeymooner</footer>
					</blockquote>
				</div>
			</section>

			{/* Newsletter CTA */}
			<section className="w-full max-w-screen-xl mx-auto mt-12">
				<div className="rounded-2xl border p-6 bg-foreground text-background card-hover">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
						<div className="md:col-span-2">
							<h3 className="text-xl font-semibold mb-1">Stay in the loop</h3>
							<p className="opacity-85">Get curated deals and new itineraries in your inbox once a week.</p>
						</div>
						<form className="flex gap-2">
							<input type="email" className="search-input h-10 rounded-lg bg-background/20 text-background border px-3 placeholder:opacity-80" placeholder="Email address" />
							<button className="btn btn-primary ring-focus">Subscribe</button>
						</form>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="w-full max-w-screen-xl mx-auto mt-12">
				<h2 className="text-2xl font-semibold tracking-tight mb-4">FAQ</h2>
				<div className="space-y-3">
					<details className="card p-4">
						<summary className="font-medium cursor-pointer">Is this free to use?</summary>
						<p className="mt-2 text-sm text-muted-foreground">Browsing and planning are free. You only pay when booking.</p>
					</details>
					<details className="card p-4">
						<summary className="font-medium cursor-pointer">Can I collaborate with friends?</summary>
						<p className="mt-2 text-sm text-muted-foreground">Yes. Share itineraries and co-edit in real time.</p>
					</details>
					<details className="card p-4">
						<summary className="font-medium cursor-pointer">Do you support offline access?</summary>
						<p className="mt-2 text-sm text-muted-foreground">Key trip info is available offline once saved to your device.</p>
					</details>
				</div>
			</section>
		</div>
	);
}


import type { ReactElement } from "react";

export default function Page(): ReactElement {
	return (
		<main className="center-page">
			<section className="card" aria-labelledby="hero-title">
				<h1 id="hero-title" className="name">Nicolás Alejandro García Pasmiño</h1>
				<p className="subtitle"><q>flash el hombre mas rapido del mundo siempre llega tarde</q></p>

				<div className="meta">
					<span className="accent-underline" aria-hidden="true"></span>
				</div>
			</section>
		</main>
	);
}

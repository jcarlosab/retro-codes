import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
	const [data, setData] = useState({});
	const [selectedPlatforms, setSelectedPlatforms] = useState([]); 
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/game_codes.json")
			.then((res) => res.json())
			.then((json) => setData(json))
			.catch((err) => console.error("Error cargando JSON:", err))
			.finally(() => setLoading(false));
	}, []);

const filteredGames =
  	selectedPlatforms.length === 0
		? Object.entries(data)
			.flatMap(([p, games]) =>
			Object.entries(games).map(([game, codes]) => [game, codes, p])
			)
			.filter(([game]) =>
			game.toLowerCase().includes(search.toLowerCase())
			)
			.sort((a, b) => a[0].localeCompare(b[0]))
		: selectedPlatforms
			.flatMap((p) =>
			Object.entries(data[p] || {}).map(([game, codes]) => [game, codes, p])
			)
			.filter(([game]) =>
			game.toLowerCase().includes(search.toLowerCase())
			);

	return (
		<div className="app">
			<header className="app-header">
				<div className="logo">Retro Kodes</div>
			</header>

			<div className="filters">
				<div className="search-container">
					<input
						className="search-input"
						type="text"
						placeholder="Buscar juego..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="tags">
					<span
						className={`tag tag-all ${selectedPlatforms.length === 0 ? "active" : ""}`}
						onClick={() => setSelectedPlatforms([])}
					>
						Todos
					</span>
					{Object.keys(data).map((p) => (
						<span
							key={p}
							className={`tag tag-${p.toLowerCase().replace(/\s+/g, "-")} ${selectedPlatforms.includes(p) ? "active" : ""}`}
							onClick={() => {
								setSelectedPlatforms((prev) =>
								prev.includes(p)
									? prev.filter((x) => x !== p)
									: [...prev, p]
								);
							}}
						>
							{p}
						</span>
					))}
				</div>
			</div>

			<div className="content">
				{loading ? (
					<div className="loading">Cargando...</div>
				) : filteredGames.length > 0 ? (
					filteredGames.map(([game, codes, p]) => (
						<div key={game} className="game-block">
							<div className="game-header">
								<h2 className="game-title">{game}</h2>
								<div className="badge">{p}</div>
							</div>
							<div className="list-cards">
								{codes.map((code, idx) => (
									<Card key={idx} code={code} />
								))}
							</div>
						</div>
					))
				) : (
					<div className="no-results">No se encontraron resultados</div>
				)}
			</div>
		</div>
	);
}

export default App;
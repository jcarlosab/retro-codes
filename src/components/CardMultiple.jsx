import { useState } from "react";
import CardSimple from "./CardSimple";

function CardMultiple({ category, list }) {
  	const [open, setOpen] = useState(false);

 	return (
		<div className={`card ${open ? "open" : ""}`}>
			<div
				className={`card-title ${open ? "active" : ""}`}
				onClick={() => setOpen(!open)}
			>
				{category}
			</div>

			{/* Si la categoría está abierta, mostramos sus items */}
			{open && (
				<div className="card-content">
				{list.map((item, idx) => (
					<CardSimple key={idx} code={item} />
				))}
				</div>
			)}
		</div>
	);
}

export default CardMultiple;

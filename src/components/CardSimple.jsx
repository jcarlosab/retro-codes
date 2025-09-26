import { useState } from "react";

function CardSimple({ code }) {
  	const [open, setOpen] = useState(false);

	return (
		<div className={`card ${open ? "open" : ""}`}>
			<div
				className={`card-title ${open ? "active" : ""}`}
				onClick={() => setOpen(!open)}
			>
				{code.name}
			</div>
		{open && (
			<div className="card-content">
			<div className="card-description">{code.description}</div>
			{code.code && <div className="card-code">{code.code}</div>}
			</div>
		)}
		</div>
	);
}

export default CardSimple;

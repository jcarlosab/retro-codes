import CardSimple from "./CardSimple";
import CardMultiple from "./CardMultiple";

function Card({ code }) {
	if (code.category) {
		return <CardMultiple category={code.category} list={code.list} />;
	}
	return <CardSimple code={code} />;
}

export default Card;

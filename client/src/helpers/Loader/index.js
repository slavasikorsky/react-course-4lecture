import loaderImage from "../../assets/images/loader.png";
import "./Loader.scss";

function Loader() {
	return <img className="loader" src={loaderImage} alt="loading..." />;
}

export default Loader;

import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

import heroImage from "./assets/images/hero.png";

function App() {
	return (
		<>
			<Header />
			<Hero image={heroImage} />
			<Footer />
		</>
	);
}

export default App;

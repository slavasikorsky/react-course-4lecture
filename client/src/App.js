import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';

import heroImage from './assets/images/hero.png';

function App() {
  const API = 'https://newsapi.org/v2/top-headlines?category=general&country=us&apiKey=6d10830dbe49457f81adef8950ec0db0';

  return (
      <>
        <Header />
        <Hero image={heroImage} />
        <Content />
        <Footer />
      </>
  );
}

export default App
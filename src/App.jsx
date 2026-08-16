import { useState, useCallback } from 'react';
import Loader from './components/Loader';
import Starfield from './components/Starfield';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EasterEgg from './components/EasterEgg';
import Differentiator from './components/Differentiator';
import './styles/app.css';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <Loader onDone={handleLoaded} />}

      <div className={`app-root ${loaded ? 'app-visible' : ''}`}>
        {/* Fixed background starfield */}
        <Starfield density={200} />

        {/* CRT vignette */}
        <div className="crt-vignette" aria-hidden="true" />

        {/* Navigation */}
        <Nav />

        {/* Main content */}
        <main>
          <Hero />
          <About />
          <Differentiator />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>

        <Footer />

        {/* Easter eggs */}
        <EasterEgg />
      </div>
    </>
  );
}

import '@fontsource/vt323';
import '@fontsource/share-tech-mono';
import './index.css';

import StarField from './components/StarField';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Global star field — fixed parallax layer */}
      <StarField />

      {/* CRT scanline overlay */}
      <div className="scanlines" aria-hidden="true" />

      {/* Navigation */}
      <Nav />

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

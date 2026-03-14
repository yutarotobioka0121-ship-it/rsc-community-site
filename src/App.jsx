import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import EventSchedule from './components/EventSchedule';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <About />
        <EventSchedule />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Lottie from 'react-lottie-player';
import heartAnimation from './love.json';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [answers, setAnswers] = useState({ q1: '', q2: '' });
  const [error, setError] = useState('');
  const [showWishes, setShowWishes] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const correctAnswers = {
    q1: 'A',
    q2: 'Boo'
  };

  const wishes = [
    "Can’t believe it’s been so long since that first time we met at Surreal, I never imagined you’d become so special to me…or that I'd start thinking of you as my tiger boy. 🐯",
    "You always make sure I'm well-fed, even if it means sneaking in bites even when I say NO! I both hate you and... 💖",
    "You’re both smart and stupid, and I love that I can look up to you (and sometimes down 😛)",
    "Although the Harry Potter play wasn't to your expectation, Telugu movies have become mine",
    "You still owe me a love letter, by the way! Just a little reminder. 😘",
    "💙💜 Happy 26th, Boo! 💙💜",
    "Wherever life takes us, know that I’ll always be here, cheering you on and your forever well-wisher.",
  ];

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleAuthentication = () => {
    if (answers.q1 === correctAnswers.q1 && answers.q2 === correctAnswers.q2) {
      setIsAuthenticated(true);
      setIsModalOpen(false);
    } else {
      setError('Oops, try again!');
    }
  };

  // Show each wish one by one
  useEffect(() => {
    if (isAuthenticated && showWishes < wishes.length) {
      const timer = setTimeout(() => {
        setShowWishes(showWishes + 1);
      }, 2000); // Change time here for delay between messages
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, showWishes]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };


  return (
    <div className="App">
      {isAuthenticated ? (
        <div className="landing-page">
          <img src="./b1.jpg" alt="background" className="background-image" />
          <audio src="./song.mp3" autoPlay loop muted={!isPlaying} />
          
          <button onClick={toggleMusic} className="music-button">
            {isPlaying ? '🔊 Mute' : '🔈 Unmute'}
          </button>

          <div className="wishes">
            {wishes.slice(0, showWishes).map((wish, index) => (
              <p key={index} className="wish">{wish}</p>
            ))}
          </div>
        </div>
      ) : (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Authentication Quiz"
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className='animation-cen'>
          <Lottie loop animationData={heartAnimation} play style={{ width: 100, height: 100, marginBottom: '20px', justifyContent: "center" }} />
          </div>
          <h2 style={{ color: '#FF4500', fontFamily: "'Dancing Script', cursive" }}>Answer these to continue ❤️</h2>
          <div className="question-container">
            <label>1. What's my favorite thing to do when I’m with you?</label>
            <select name="q1" value={answers.q1} onChange={handleAnswerChange} className="dropdown">
              <option value="">Select an answer</option>
              <option value="A">Watch movies</option>
              <option value="B">Go on walks</option>
              <option value="C">Sleeping</option>
              <option value="D">Eat our favorite snacks together</option>
            </select>
          </div>
          <div className="question-container">
            <label>2. What do I call you?</label>
            <input
              type="text"
              name="q2"
              value={answers.q2}
              onChange={handleAnswerChange}
              className="input-field"
              placeholder="Type here..."
            />
          </div>
          {/* <div className="question-container">
            <label>2. If you could describe me in one word, what would it be?</label>
            <select name="q2" value={answers.q2} onChange={handleAnswerChange} className="dropdown">
              <option value="">Select an answer</option>
              <option value="A">Adorable</option>
              <option value="B">Crazy</option>
              <option value="C">Smart</option>
              <option value="D">All of the above</option>
            </select>
          </div> */}
          {error && <p style={{ color: 'purple' }}>{error}</p>}
          <button onClick={handleAuthentication} className="submit-button">Submit</button>
        </Modal>
      )}
    </div>
  );
}

export default App;

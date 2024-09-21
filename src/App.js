import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import eye_image from '/Users/hejixd/Desktop/TEST_SITE/demo/src/pictures/eye.png';
import closed_eye from '/Users/hejixd/Desktop/TEST_SITE/demo/src/pictures/hidden.png';

function App() {
  const [isWorkoutsDropdownOpen, setIsWorkoutsDropdownOpen] = useState(false);
  const [isCinematicsDropdownOpen, setIsCinematicsDropdownOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [currentImage, setCurrentImage] = useState(eye_image);
  const playerRef = useRef(null);

  // Define workout data
  const workouts = {
    arms: [
      { exercise: "Bicep Curls", sets: 3, reps: "8-12" },
      { exercise: "Preacher Curls", sets: 2, reps: "8-12" },
      { exercise: "Cable Hammer Curls", sets: 3, reps: "8-12" },
      { exercise: "Single Arm Tricep Pushdown", sets: 3, reps: "8-12" },
      { exercise: "Overhead Tricep Extension", sets: 3, reps: "8-12" },
      { exercise: "Rear Delt Flies", sets: 3, reps: "8-12" },
      { exercise: "Dumbbell Shoulder Press", sets: 2, reps: "8-12" },
      { exercise: "Cable Lateral Raises", sets: 3, reps: "8-12" },
    ],
    chestBack: [
      { exercise: "Dumbbell Incline Bench", sets: 3, reps: "8-12" },
      { exercise: "Dumbbell Flat Bench", sets: 3, reps: "8-12" },
      { exercise: "Incline Flies", sets: 2, reps: "8-12" },
      { exercise: "Peck Deck", sets: 2, reps: "8-12" },
      { exercise: "Pull Ups", sets: 3, reps: "8-12" },
      { exercise: "Barbell Rows", sets: 3, reps: "8-12" },
      { exercise: "( Assisted ) Close Grip Pull Ups", sets: 3, reps: "8-12" },
      { exercise: "Single Arm Row", sets: 3, reps: "8-12" },
    ],
    legs: [
      { exercise: "Squats", sets: 3, reps: "8-12" },
      { exercise: "RDLs", sets: 3, reps: "10-12" },
      { exercise: "Split Squats", sets: 3, reps: "8-12" },
      { exercise: "Leg Extensions", sets: 3, reps: "10-12" },
    ],
  };

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('player', {
        videoId: '',
        playerVars: {
          'playsinline': 1,
          'controls': 0,
          'disablekb': 1,
          'fs': 0,
          'loop': 1,
          'rel': 0
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };

    function onPlayerReady(event) {}
    function onPlayerStateChange(event) {}

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    if (dropdown === 'workouts') {
      setIsWorkoutsDropdownOpen(!isWorkoutsDropdownOpen);
    } else if (dropdown === 'cinematics') {
      setIsCinematicsDropdownOpen(!isCinematicsDropdownOpen);
    }
  };

  const handleWorkoutClick = (workout) => {
    // Toggle workout details visibility
    if (selectedWorkout && selectedWorkout === workouts[workout]) {
      setSelectedWorkout(null); // Hide the workout details
    } else {
      setSelectedWorkout(workouts[workout]); // Show the selected workout details
    }
  };
  

  const playVideo = (videoId) => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(videoId);
      setIsOverlayVisible(false);
      setCurrentImage(closed_eye);
    }
  };

  const flipImage = () => {
    setIsOverlayVisible(!isOverlayVisible);
    setCurrentImage(isOverlayVisible ? closed_eye : eye_image);
  };

  return (
    <div className="container">
      <div className="sidenav">
        <h1 className="About">About</h1>
        <button onClick={() => toggleDropdown('workouts')} className="dropbtn">Workouts</button>
        <div className={`dropdown ${isWorkoutsDropdownOpen ? 'open' : ''}`}>
          <p onClick={() => handleWorkoutClick('arms')}>Arms</p>
          <p onClick={() => handleWorkoutClick('chestBack')}>Chest & Back</p>
          <p onClick={() => handleWorkoutClick('legs')}>Legs</p>
        </div>
        <h1 className="Clients">Clients</h1>
        <h1 className="Contact">Contact</h1>
        <button onClick={() => toggleDropdown('cinematics')} className="dropbtn">Cinematics</button>
        <div className={`dropdown ${isCinematicsDropdownOpen ? 'open' : ''}`}>
          <p onClick={() => playVideo('c9AAwujTlL8')}>Anime 1</p>
          <p onClick={() => playVideo('6bpIY5TK8d0')}>Anime 2</p>
          <p onClick={() => playVideo('TFU1Tg3HJDg')}>Carti</p>
        </div>
      </div>
      <div className="video-player">
        <div id="player"></div>
        <div className={`overlay ${!isOverlayVisible ? 'hidden' : ''}`}></div>
        <img onClick={flipImage} alt="eye" src={currentImage} className="eyething"></img>

        {selectedWorkout && (
          <div className="workout-details">
            <h2>Workout Details:</h2>
            <ul>
              {selectedWorkout.map((exercise, index) => (
                <li key={index} className="exercise-item">
                  <span className="exercise-name">{exercise.exercise}</span>: 
                  <span className="sets-reps">{exercise.sets} sets of {exercise.reps}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

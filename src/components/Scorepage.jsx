import React, { useEffect, useState } from 'react';
import { app } from './firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import './score.css'

const Scorepage = () => {
  const { score } = useParams();
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        // User is signed in
        setUser(loggedInUser);
        console.log(loggedInUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up the event listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className='score'>
      <div className='scoreboard'>
        <h2>{user ? user.email : 'Not logged in'}</h2>
        <p>Total Score: {score}</p>
      </div>
    </div>
  );
};

export default Scorepage;

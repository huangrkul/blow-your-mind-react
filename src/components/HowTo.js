import React from 'react';

const HowTo = () => {

  const handleHowTo = () => {
    document.querySelector('.howto-container').classList.toggle('howto-enter');
  }

  return (
    <aside className="howto-container">
    <span className="title-font" onClick={handleHowTo}>X</span>
      <p>Click the red button and solve the riddle, win this game you’ll be fit as a fiddle. There’s only two hints so
        please play nice, for the kill code to win is like rolling dice.
        <br />
        <br />
        Sounds fun, right? Goodluck!</p>
    </aside>
  );
}

export default HowTo;

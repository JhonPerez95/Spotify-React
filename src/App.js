import React from 'react';
import './style/App.css';

function App() {
  const params = getHashParams();

  console.log(params);

  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  return (
    <div className="App">
      <header className="App-header">
        <a href="http://localhost:8888/">
          <button>Login with Spotify</button>
        </a>
      </header>
    </div>
  );
}

export default App;

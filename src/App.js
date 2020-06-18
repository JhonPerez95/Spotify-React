import React, { useState, useEffect } from 'react';
import './style/App.css';
import Spotify from 'spotify-web-api-js';

var spotifyWeb = new Spotify();

function App() {
  // GET ACCESS_TOKEM
  const params = getHashParams();
  // console.log(params.access_token);
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

  // STATES
  const [loggedIn, setLoggedIn] = useState(params.access_token ? true : false);
  const [nowPlaying, setNowPlaying] = useState({
    name: 'not Checkend',
    image: '',
  });

  useEffect(() => {
    if (params.access_token) {
      // console.log(params.access_token);
      spotifyWeb.setAccessToken(params.access_token);
    }
  }, []);

  // VALIDADET

  const getNowPlaying = () => {
    spotifyWeb.getMyCurrentPlaybackState().then((res) => {
      console.log(res.item.album.images[0].url);
      const urlImg = res.item.album.images[0].url;
      setNowPlaying((nowPlaying) => ({
        ...nowPlaying,
        name: res.item.name,
        image: urlImg,
      }));
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <a href="http://localhost:8888/">
          <button>Login with Spotify</button>
        </a>
        <div>Now Playing: {nowPlaying.name}</div>
        <div>
          <img src={nowPlaying.image} style={{ width: 500 }} />
          {console.log(nowPlaying.image)}
        </div>
        <button onClick={() => getNowPlaying()}>Check Now Playing</button>
      </header>
    </div>
  );
}

export default App;

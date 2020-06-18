import React, { useState, useEffect } from 'react';
import './style/App.css';
import Spotify from 'spotify-web-api-js';

var spotifyWeb = new Spotify();

function App() {
  // STATES
  const [playList, SetPlayList] = useState([]);
  // const [loggedIn, setLoggedIn] = useState(params.access_token ? true : false);
  const [nowPlaying, setNowPlaying] = useState({
    name: 'not Checkend',
    image: '',
  });

  // GET ACCESS_TOKEM
  const params = getHashParams();
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

  // OBTENIENDO ULTIMA CANCION
  const getNowPlaying = () => {
    spotifyWeb.getMyCurrentPlaybackState().then((res) => {
      // console.log(res.item.album.images[0].url);

      setNowPlaying((nowPlaying) => ({
        ...nowPlaying,
        name: res.item.name,
        image: res.item.album.images[0].url,
      }));
    });
  };

  // OBTENIENDO PLAYLIST FOR USER
  const getAllPlayList = () => {
    spotifyWeb.getUserPlaylists().then((res) => {
      SetPlayList(res.items);

      // console.log(playList[0]);
    });
  };

  useEffect(() => {
    getAllPlayList();
    //
  }, []);

  // OBTENIENDO TODAS LAS CANCIONES DE UNA PLAYLIST
  // const getPlayListTracks = () => {
  //   spotifyWeb.getPlaylistTracks().then((res) => {
  //     console.log(res);
  //   });
  // };

  console.log(playList[0].images);
  return (
    <div className="App">
      <header className="App-header">
        <a href="http://localhost:8888/">
          <button>Login with Spotify</button>
        </a>
        <div>Now Playing: {nowPlaying.name}</div>
        <div>
          <img src={nowPlaying.image} style={{ width: 500 }} />
        </div>
        <button onClick={() => getNowPlaying()}>Check Now Playing</button>
        {/* <div>
          <button onClick={() => getAllPlayList()}> Play List Saved</button>
        </div> */}
        {/* {playList.map((item, i) => (
          <div className="card">
            <img src={item[i].images[0].url} style={{ width: 250 }} />
            <div className="container">
              <h4>
                <b> {item[i].name}</b>
              </h4>
              <p> Total Track's: {item[i].tracks.total} </p>
            </div>
          </div>
        ))} */}
      </header>
    </div>
  );
}

export default App;

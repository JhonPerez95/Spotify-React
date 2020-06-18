import React, { useState, useEffect } from 'react';
import './style/App.css';
import Spotify from 'spotify-web-api-js';
import { Grid } from '@material-ui/core';

import CardPlayList from './components/cardPlayList/container';
import getHashParams from './service/accesToken';
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
  if (params.access_token) {
    spotifyWeb.setAccessToken(params.access_token);
  }

  // OBTENIENDO ULTIMA CANCION
  const getNowPlaying = () => {
    spotifyWeb.getMyCurrentPlaybackState().then((res) => {
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
    });
  };

  useEffect(() => {
    getAllPlayList();
  }, []);

  // OBTENIENDO TODAS LAS CANCIONES DE UNA PLAYLIST
  // const getPlayListTracks = () => {
  //   spotifyWeb.getPlaylistTracks().then((res) => {
  //     console.log(res);
  //   });
  // };

  console.log(playList);
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

        {/* <Grid container justify="center">
          {playList.map((item, i) => (
            <CardPlayList
              image={item[i].images[0].url}
              name={item[i].name}
              total={item[i].tracks.total}
              key={i}
            />
          ))}
        </Grid> */}
      </header>
    </div>
  );
}

export default App;

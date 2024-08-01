import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../projectCss/SongCard.css'


function SongCard({coverartUrl, songName, artistName}) {

  return (
    <>
      <div className="song-card-box">
        <div className="inner-song-card">
          <div className="song-card-picture">
            <img className="album-cover-images" src={coverartUrl} alt="Error Loding Image" />
            <div className="song-details">
              <p className='song-name'>{songName}</p>
              <p className='artist-name'>{artistName}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SongCard
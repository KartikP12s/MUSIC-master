import React from 'react'
import '../projectCss/searchPage.css'


function TrackCard({coverartUrl, songName, artistName}) {
  return (
    <>
      {/* <div className='TrackCard-container'> */}
        <div className="TrackCard-song-card-picture">
          <img
            className="TrackCard-album-cover-images"
            src={coverartUrl}
            // src='https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/f9/58/95/f95895f4-0ef6-a636-241e-ba4824ef6621/17UMGIM08349.rgb.jpg/400x400cc.jpg'
            alt="Error Loding Image"
          />

          <div className="TrackCard-song-details">
            <p className="TrackCard-song-name">{songName}</p>
            <p className="TrackCard-artist-name">{artistName}</p>
            {/* <p className="TrackCard-song-name">Song name</p>
            <p className="TrackCard-artist-name">Micheal Yakson</p> */}
          </div>
        </div>
      {/* </div> */}
    </>
  );
}

export default TrackCard
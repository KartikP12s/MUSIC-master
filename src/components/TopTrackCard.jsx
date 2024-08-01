import React from 'react'

import '../projectCss/searchPage.css'

function TopTrackCard({coverartUrl, songName, artistName}) {
  return (
    <>
        <div className="TopTrackCard-song-card-picture">

          <img className="TopTrackCard-album-cover-images" src={coverartUrl} alt="Error Loding Image" />

          <div className="TopTrackCard-song-details">
            <p className='TopTrackCard-song-name'>{songName}</p>
            <p className='TopTrackCard-artist-name'>{artistName}</p>

          </div>

        </div>
    </>
  )
}

export default TopTrackCard
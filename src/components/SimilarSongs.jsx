import React from 'react'
import { useGetSimilarSongsQuery } from '../musicFetchApis/shazamApi';

function SimilarSongs() {
  
  // var trackId = parseInt(data?.result?.tracks?.hits[3]?.key);
  // if (isNaN(trackId)) {
  //   console.error("Invalid track ID:", data?.result?.tracks?.hits[3]?.key);
  // }
  // const testSongId = 673104339
  // const { similarSongsData: songData, isFetchingSong, similarSongError } = useGetSimilarSongsQuery(testSongId);
  // console.log(songData)



  


  // if (isFetchingSong) {
  //   return <p>Loading...</p>;
  // }

  // if (similarSongError) {
  //   return <p>Error: {error ? error.message : "loading"}</p>;
  // }
  return (
    <>
      Similar Songs
    </>
  )
}

export default SimilarSongs
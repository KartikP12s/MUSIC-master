import React from 'react'
import '../projectCss/TopCharts.css'
import {useGetTopChartsQuery} from '../musicFetchApis/shazamApi'
import Card from './SongCard'

function HomePageTopCharts() {

  const { data, isFetching, error } = useGetTopChartsQuery();


  
  //code to get the urls for  album cover
  const links = [];
  function coverArtUrlLink() {
    for (var i = 0; i < data?.result?.tracks?.length; i++) {
      links.push(String(data?.result?.tracks[i]?.images?.coverarthq));
    }
    return links;
  }
  const images = coverArtUrlLink();


  //code to get the song name
  const names = [];
  function artistDetails() {
    for (var i = 0; i < data?.result?.tracks?.length; i++) {
      names.push(String(data?.result?.tracks[i]?.title));
    }
    return names;
  }
  const artDetails = artistDetails();


    //code to get the artist name 
    const artistName = [];
    function artistNameFunc() {
      for (var i = 0; i < data?.result?.tracks?.length; i++) {
        artistName.push(String(data?.result?.tracks[i]?.subtitle));
      }
      return artistName;
    }
    const artistNames = artistNameFunc();

  //loading while fetching
  if (isFetching) {
    return <p>Loading...</p>;
  }

  //error when fetching
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="main-container">
        <div className="container-header">
          <h1 className="container-title">Top 20 Songs</h1>
        </div>
        <div className="container-chart-holder">

          {images.map((url, index) => (
            <Card
              key={index}
              coverartUrl= {url}
              songName= {artDetails[index]}
              artistName = {artistNames[index]}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePageTopCharts
import '../projectCss/searchPage.css'
import SearchBar from '../components/SearchBar'
import PostLoginNavBar from '../components/PostLoginnavbar'
import SimilarSongs from '../components/SimilarSongs'
import TopTrackCard from '../components/TopTrackCard'
import TrackCard from '../components/trackCard'
import { useParams } from 'react-router-dom'
import {useGetTracksQuery} from '../musicFetchApis/shazamApi'
import React from 'react';
import AccountButton from '../components/AccountDetails'




function Search() {
  const { searchQuery } = useParams();
  const { data, isFetching, error } = useGetTracksQuery(searchQuery);


  const links = [];
  function coverArtUrlLink() {
    for (var i = 1; i < data?.result?.tracks?.hits?.length; i++) {
      links.push(String(data?.result?.tracks?.hits[i]?.images?.default));
    }
    return links;
  }
  const images = coverArtUrlLink();

  //code to get the song name
  const names = [];
  function artistDetails() {
    for (var i = 1; i < data?.result?.tracks?.hits?.length; i++) {
      names.push(String(data?.result?.tracks?.hits[i]?.heading?.title));
    }
    return names;
  }
  const artDetails = artistDetails();

  //code to create the array of all song names
  const allSongNamesArray =  []
  allSongNamesArray.push(String(data?.result?.tracks?.hits[0]?.heading?.title))
  for (var i = 1; i < data?.result?.tracks?.hits?.length; i++) {
    allSongNamesArray.push(String(data?.result?.tracks?.hits[i]?.heading?.title))
  }


    //code to get the artist name 
    const artistName = [];
    function artistNameFunc() {
      for (var i = 1; i < data?.result?.tracks?.hits?.length; i++) {
        artistName.push(String(data?.result?.tracks?.hits[i]?.heading?.subtitle));
      }
      return artistName;
    }
    const artistNames = artistNameFunc();

  
  /*----------------------------------------------------------------------------------*/
  const allSongNamesArrayNoParentheses = removeParentheses(allSongNamesArray)
                            console.error('allSongNamesArrayNoParentheses: '+ allSongNamesArrayNoParentheses)

  


  //code to create the array of words from search query
  function sliceWords(searchQuery) {
    const querySlicedWordArray = searchQuery.split(' ')
    return querySlicedWordArray
  }
  const slicedQueryArray = sliceWords(searchQuery)
                            console.error('searchQuery: ' + slicedQueryArray)


  //code to remove paranthese from song names
        // const songName1 = allSongNamesArray[0].toLocaleLowerCase();
        // const slicedSongname1= sliceWords(songName1);

  function removeParentheses(songArray){
    const slicedSongnameNoParentheses = []
    for (var i = 0; i < songArray.length; i++) {
      slicedSongnameNoParentheses.push(songArray[i].replace(/\([^)]*\)/g, "").trim());
    }
    return slicedSongnameNoParentheses;
  }
        // removeParanthese(slicedSongname1)
        // console.log(removeParanthese(slicedSongname1))

  //code to make an array with all words from all song names
  const allSongNamesArrayWithNoParentheses = removeParentheses(allSongNamesArray)

  function allWordsArray(allSongNamesArray){
    const allWordsArray = []
    for (var i = 0; i < allSongNamesArray.length; i++) {
      const songName = allSongNamesArray[i];
      const slicedSongname = sliceWords(songName);
      for (var j = 0; j < slicedSongname.length; j++) {
        allWordsArray.push(slicedSongname[j].toLocaleLowerCase())
      }
    }
    return allWordsArray
  }
  const allWordsFromAllSongs = allWordsArray(allSongNamesArrayWithNoParentheses)
                            console.info('allSongs: ' + allWordsFromAllSongs)
  


  //code to  vectorize the song names depending on the search query
  function vectorizeSongNames(allSongNamesArray, songNameArray) {

    const vectorizedSongNamesArray = []
    const allSongNamesArrayLength = allSongNamesArray.length

    for (var j = 0; j < songNameArray.length; j++) {
      for (var i = 0; i < allSongNamesArray.length; i++) {
        if (songNameArray[j].toLocaleLowerCase() === allSongNamesArray[i].toLocaleLowerCase()) {
          vectorizedSongNamesArray.push(1);
        }
      }
    }

    const vectorizedSongNamesArrayLength = vectorizedSongNamesArray.length
    const remainingZeroes = (allSongNamesArrayLength - vectorizedSongNamesArrayLength)

    for (var k = 0; k < remainingZeroes; k++) {
      vectorizedSongNamesArray.push(0);
    }

    return vectorizedSongNamesArray;
  }
  const queryVector = vectorizeSongNames(allWordsFromAllSongs, slicedQueryArray)
                              console.info(queryVector)


  //code to vectorize all song names
  function vectorizeAllSongNames(allWordsFromAllSongs, allSongNamesArrayNoParentheses) {
    const allSongVectorizedArray = []
    for(var i=0; i<allSongNamesArrayNoParentheses.length; i++){
      const songNameWords = sliceWords(allSongNamesArrayNoParentheses[i])
      const vector = vectorizeSongNames(allWordsFromAllSongs, songNameWords)
      allSongVectorizedArray.push(vector)
    }
    return allSongVectorizedArray
  }
  const vectorForAllSongResults = vectorizeAllSongNames(allWordsFromAllSongs, allSongNamesArrayNoParentheses)
  console.log(vectorForAllSongResults)

  //write cosine simalirity code after that you need to implement more checks to see if the song is actually similar or not

  //the lower the value of the angle, the closer it is to the search query. If it is 0, then it is a perfect match.

  return (
    <>
      <SearchBar/>
      <PostLoginNavBar/>
      
      <div className='search-results-main-container'>

        <div className='all-song-results-container'>

          <div className='top-song-result-container'>
            <div className='top-song-card'>
              <TopTrackCard
                coverartUrl= {String(data?.result?.tracks?.hits[0]?.images?.default)}
                songName= {String(data?.result?.tracks?.hits[0]?.heading?.title)}
                artistName = {String(data?.result?.tracks?.hits[0]?.heading?.subtitle)}
              />
            </div>
          </div>

          <div className='other-songs-result-container'>
            <div className='other-song-card-holder'>
            {images.map((url, index) => (
            <TrackCard
              key={index}
              coverartUrl= {url}
              songName= {artDetails[index]}
              artistName = {artistNames[index]}
            />
          ))}
              
            </div>
          </div>

        </div>

        <div className='all-artists-result-container'>
          <div className='all-artists-card-holder'> 
            <SimilarSongs/>
          </div>
        </div>

      </div>
      <AccountButton/>
    </>
  )
}

export default Search
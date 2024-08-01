// @ts-ignore
import PostLoginNavbar from '../components/PostLoginNavbar'
// @ts-ignore
import HomePageTopCharts from '../components/HomePageTopCharts.jsx'
import SearchBar from '../components/SearchBar'
import '../projectCss/navbar.css'
import AccountButton from '../components/AccountDetails'
import {useState} from 'react'



function Playlist() {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");
    
  

  return (
    <div>
      <PostLoginNavbar/>
      <SearchBar/>
      <AccountButton/>
    </div>
  )
}

export default Playlist
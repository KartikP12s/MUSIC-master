// @ts-ignore
import PostLoginNavbar from '../components/PostLoginNavbar'
// @ts-ignore
import HomePageTopCharts from '../components/HomePageTopCharts.jsx'
import SearchBar from '../components/SearchBar'
import '../projectCss/navbar.css'



function Playlist() {
    const [playlistName, setPlaylistName] = useState("");
    
  

  return (
    <div>
      <PostLoginNavbar/>
      <SearchBar/>
    </div>
  )
}

export default Playlist
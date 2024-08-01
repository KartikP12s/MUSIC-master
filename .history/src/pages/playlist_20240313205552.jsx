// @ts-ignore
import PostLoginNavbar from '../components/PostLoginNavbar'
// @ts-ignore
import HomePageTopCharts from '../components/HomePageTopCharts.jsx'
import SearchBar from '../components/SearchBar'
import '../projectCss/navbar.css'



function PostLoginHome() {
  

  return (
    <div>
      <PostLoginNavbar/>
      <SearchBar/>
      <HomePageTopCharts/>


    </div>
  )
}

export default PostLoginHome
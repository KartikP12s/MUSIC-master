// @ts-ignore
import PostLoginNavbar from '../components/PostLoginNavbar'
// @ts-ignore
import HomePageTopCharts from '../components/HomePageTopCharts.jsx'
import SearchBar from '../components/SearchBar'
import '../projectCss/navbar.css'
import AccountButton from '../components/AccountDetails'



function PostLoginHome() {
  

  return (
    <div>
      <SearchBar/>
      <PostLoginNavbar/>
      <HomePageTopCharts/>
      <AccountButton/>


    </div>
  )
}

export default PostLoginHome
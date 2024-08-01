import React from 'react'
import '../projectCss/navbar.css'
import { useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'


function PostLoginNavbar() {
    const navigate = useNavigate();
    const homeButtonClick = (e) =>{
        e.preventDefault()
        navigate(`/home`)
      }
    
      const searchBarHighlightClick = () =>{
        document.querySelector('.search-bar-input').focus()
      }
      const playlist = (e)  =>{
        e.preventDefault()
        navigate(`/playlist`)
      }

  return (
    <>
    {/* screen side nav bar */}
    <nav className="navbar">
            <ul className="navbar-nav">
                <li className="logo">
                    <a onClick={homeButtonClick} className="nav-link">
                        <img id="mainicon" src="../src/icons/Airpfp.png" draggable="false"/>
                        <span className="linktext">Air Music</span>
                    </a>
                </li>
               
                <li className="nav-item">
                    <a onClick={homeButtonClick} className="nav-link">
                        
                        <i id="navicons" className="fa-solid fa-house fa-2x"></i>
                        <span className="linktext">Home</span>
                    </a>
                </li>
             
                <li className="nav-item">
                    <a onClick={searchBarHighlightClick} className="nav-link">
                        
                        <i id="navicons" className="fa-solid fa-magnifying-glass fa-2x"></i>
                        <span className="linktext">Search</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a onClick={searchBarHighlightClick} className="nav-link">
                        
                        <i id="navicons" className="fa-solid fa-music fa-2x"></i>
                        <span className="linktext">Playlists</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        
                        <i id="navicons" className="fa-solid fa-heart fa-2x"></i>
                        <span className="linktext">Liked Songs</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i  id="navicons" className="fa-solid fa-plus fa-2x"></i>
                        <span className="linktext">Create Playlist</span>
                    </a>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default PostLoginNavbar
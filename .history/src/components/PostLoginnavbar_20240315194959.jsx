import React from 'react'
import '../projectCss/navbar.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CreatePlaylistModal from './createPlaylistModal'
import { useState, useEffect, useRef } from 'react'

function PostLoginNavbar() {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const modalRef = useRef(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const homeButtonClick = (e) => {
        e.preventDefault()
        navigate(`/home`)
    }

    const searchBarHighlightClick = () => {
        document.querySelector('.search-bar-input').focus()
    }
    const playlist = (e) => {
        e.preventDefault()
        navigate(`/playlist`)
    }
    const togglePlaylist = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setToggle(!toggle)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setToggle(false);
            }
        };
        if (toggle) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [toggle]);

    return (
        <>
            {/* screen side nav bar */}
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="logo">
                        <a onClick={homeButtonClick} className="nav-link">
                            <img id="mainicon" src="../src/icons/Airpfp.png" draggable="false" />
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
                        <a onClick={playlist} className="nav-link">

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
                        <a onClick={togglePlaylist} className="nav-link">
                            <i id="navicons" className="fa-solid fa-plus fa-2x"></i>
                            <span className="linktext">Create Playlist</span>
                        </a>
                    </li>
                </ul>
            </nav>
            {toggle && <CreatePlaylistModal ref={modalRef}/> }
        </>
    )
}

export default PostLoginNavbar
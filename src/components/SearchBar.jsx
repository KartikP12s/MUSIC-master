import React from 'react'
import '../projectCss/searchBar.css'
import {useState} from 'react'
import { useNavigate} from 'react-router-dom'


function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault()
    navigate(`/search/${query}`)
  }


  return (
    <>
      <div className='search-bar-area'>
        <div className='search-box-container'>
            <ion-icon name="search"></ion-icon>
            <form action="" onSubmit={handleSubmit}>
              <input
                className="search-bar-input"
                type="search"
                value = {query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for your favorite songs here"
                style={{ fontFamily: 'Montserrat', fontSize: '1em'}}
              />
            </form>
        </div>
      </div>
    </>
  );
}

export default SearchBar
import React, { forwardRef } from 'react'
import { useState } from 'react';
import '../projectCss/createPlaylistModal.css'

const CreatePlaylistModal= forwardRef((props,ref)=> {

    const [playlistName, setplaylistName] = useState('');
    const [playlistDescription, setplaylistDescription] = useState('');
    const handleCreatePlaylist = (e) =>{
        const user = JSON.parse(localStorage.getItem('user'));
        const createPlaylist = async () => {
            const response = await fetch('http://localhost:3001/create-playlist')
        }
    }
  return (
    
    <>
        <div className="background-dimmer">

        </div>
        <div className='holder'>
            <div ref={ref} className="container">
                <form className='playlist-form'>
                    <h1>Create New Playlist</h1>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Name"
                        value={playlistName}
                        onChange={(e) => setplaylistName(e.target.value)} 
                        required
                    />
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Description"
                        value={playlistDescription}
                        onChange={(e) => setplaylistDescription(e.target.value)}
                    />

                    <button onClick = {handleCreatePlaylist}>Create</button>
                </form>
                
            </div>
        </div>
    </>
  )
})

export default CreatePlaylistModal
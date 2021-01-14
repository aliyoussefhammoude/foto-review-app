import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import ImageGrid from './ImageGrid'
import useAlbum from '../../hooks/useAlbum'
import ImageUploader from './ImageUploader'
import { useAuth } from '../../contexts/RouteAuth'
import {db} from '../../firebase/firebase'
import { FormControl, FormLabel, Input } from "@chakra-ui/react"


const Album = () => {
	const [constumer, setCostumer] = useState(null)
	const [editAlbumTitle, setEditAlbumTitle] = useState(null)
	const [newTitle, setNewTitle] = useState(null)
	const [, setErrorMsg] = useState(false)
	const { albumId } = useParams()
	const { album } = useAlbum(albumId)
	const { currentUser } = useAuth()

	const handleCostumerLink = () => {
        setCostumer(`${window.location.href}/*`);
	};

	const handleTitleChange = (e) => {
		setNewTitle(e.target.value)
	}

	const handleEditAlbumTitle = () =>{
		setEditAlbumTitle(true)
	}

	const saveEditAlbumTitle = async (e) =>{
		console.log('new album title', newTitle)
		if(newTitle.length < 3 ) {
			console.log('to short')
			return(
				setErrorMsg(true)
			)
		}
		setErrorMsg(false)
		try {
			await db.collection('albums').doc(album.id).update({
				title: newTitle,
			});

		} catch (e) {
			console.log("Something went wrong and the title could not be updated. Please try again.")
		}
		setEditAlbumTitle(false)
	}
	

	return (
		<>
			{album && currentUser &&
					<>
						{
							editAlbumTitle  
								? 
								<>
									<FormControl onChange={handleTitleChange} id="first-name">
										<div className="album-title">
											<FormLabel>New Album Name</FormLabel>
										</div>
										<Input />
									</FormControl>
									<Button onClick={saveEditAlbumTitle}>Save</Button>
								</>
								
								: 
								
								<div className="album-title">
									<h2 className="mb-3">{album && album.title}</h2>
									<Button onClick={handleEditAlbumTitle} className="editor-icon" >Edit album name</Button>
								</div>
						}	
						
						<Link to="/albums">back</Link>
						<ImageUploader albumId={albumId} />
						<hr />
						<ImageGrid images={album.images} />

						{album.images.length > 0 &&
							<div className="button-wrapper">
								<Button 
									className="btn button__secondary"
									onClick={handleCostumerLink}
									>Customer Link
								</Button>											
							</div>
						}	

						{
							constumer && 
							<p>{constumer}</p>
						}		
					</>
			}		
		</>
	)
}

export default Album

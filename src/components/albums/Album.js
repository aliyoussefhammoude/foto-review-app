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
	const [albumTitleChange, setalbumTitleChange] = useState(null)
	const [createTitle, setcreateTitle] = useState(null)
	const { albumId } = useParams()
	const { album } = useAlbum(albumId)
	const { currentUser } = useAuth()

	const handleCostumerLink = () => {
        setCostumer(`${window.location.href}/*`);
	};

	const handleAlbumEditChange = () =>{
		setalbumTitleChange(true)
	}

	const handleAlbumTitleChange = (e) => {
		setcreateTitle(e.target.value)
	}

	const EditedTitel = async (e) =>{
		try {
			await db.collection('albums').doc(album.id).update({
				title: createTitle,
			});

		} catch (e) {
			console.log("try again.")
		}
		setalbumTitleChange(false)
	}
	

	return (
		<>
		<div className="container">
			{album && currentUser &&
					<>
						{
							albumTitleChange  
								? 
								<>
									<FormControl onChange={handleAlbumTitleChange} id="first-name">
										<div className="album-title">
											<FormLabel>New Album Name</FormLabel>
										</div>
										<Input />
									</FormControl>
									<Button onClick={EditedTitel}>Save</Button>
								</>
								
								: 
								
								<div className="album-title">
									<h2 className="mb-3">{album && album.title}</h2>
									<Button onClick={handleAlbumEditChange} className="editor-icon" >Edit album name</Button>
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
						}{constumer && <p>{constumer}</p>}		
					</>
			}	
			</div>	
		</>
	)
}

export default Album

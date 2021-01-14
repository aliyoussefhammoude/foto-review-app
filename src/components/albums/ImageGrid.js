import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../contexts/RouteAuth'
import useDeleteImage from '../../hooks/useDeleteImage'
import useUploadImage from '../../hooks/useUploadImage';

const ImageGrid = ({ images }) => {

	// States
	const [newImages, setNewImages] = useState([])
	const [checkedImage, setCheckedImage] = useState({})
	const [deleteImage, setDeleteImage] = useState(null);
	const [newImageArray, setNewImageArray] = useState(null)
	const [, setErrorText] = useState(false)
	
	// Hooks
	const navigate = useNavigate()
	const { error, isSuccess } = useUploadImage(newImageArray);

	// Contexts
	const { currentUser } = useAuth()

	// Effects
	useEffect(() => {
		if (error) {
			setErrorText("Unexpected error, could not upload and create new album.")
		} else if (isSuccess) {
			setNewImageArray(null);
			navigate('/albums')
		} 
	}, [error, isSuccess]);
		
	// GENERAL FUNCTIONS -->

	// Delete picture/pictures
	const handleDeleteImage = (image) => {
		setDeleteImage(image);
	}
	useDeleteImage(deleteImage);


	// Handling all the checked boxed and storing in new array
	const handleCheckedImage = (e) => {
		
		setCheckedImage({...checkedImage, [e.target.name] : e.target.checked })
		
			if (newImages.includes(e.target.name)) {
				for (let i = 0; i < newImages.length; i++){     
					newImages[i] === e.target.name && newImages.splice(i, 1) 			
				}
			} else {
				newImages.push(e.target.name)
			}
		setNewImages(newImages);
	}

	// Create new album based on picked pictures
	const creatAlbum = (checkedImages) => {
		let imagesToSave = []

		images.forEach(imgItem => {
			if (checkedImages.includes(imgItem.url)) {
				imagesToSave.push(imgItem)
			}
		})

		setNewImageArray(imagesToSave)
	}

	return (
		<SRLWrapper>
			<Row className="my-3">
				{images.map(image => (
					<Col sm={6} md={4} lg={3} key={image.id}>
						<Card className="mb-3 text-center">
							<a href={image.url} title="Lightbox mode" data-attribute="SRL">
								<Card.Img variant="top" src={image.url} title={image.name} />
								{currentUser &&
									<input
										className="mt-4"
										type="checkbox"
										name={image.url}
										checked={checkedImage[image.url]}
										onChange={handleCheckedImage}
									/>
								}
							</a>
							<Card.Body>
								<Card.Text className="text-center small">
									{image.name} ({Math.round(image.size/1024)} kb)
								</Card.Text>
								{
									image.owner === currentUser.uid && (
										<Button onClick={() => {handleDeleteImage(image)}}>
											X
										</Button>
									)
								}
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
			<Row>
				<Col>
					{currentUser && newImages && newImages.length > 0 &&		
						<Button onClick={() => creatAlbum(newImages)}>
							Create an album with the images you have checked above
						</Button>
					}
				</Col>				
			</Row>
		</SRLWrapper>
	)
}

export default ImageGrid

import React, { useState, useEffect } from 'react'
import useDeleteImage from '../../hooks/useDeleteImage'
import useUploadImage from '../../hooks/useUploadImage';
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../contexts/RouteAuth'

const ImageGrid = ({ images }) => {

	const [newImageArray, setNewImageArray] = useState(null)
	const [, setErrorText] = useState(false)

	const [newPictures, setnewPictures] = useState([])
	const [imageCheck, setimageCheck] = useState({})
	const [deleteImage, setDeleteImage] = useState(null);
	
	const navigate = useNavigate()
	const { error, isSuccess } = useUploadImage(newImageArray);

	const { currentUser } = useAuth()

	useEffect(() => {
		if (error) {
			setErrorText("Unexpected error, could not upload and create new album.")
		} else if (isSuccess) {
			setNewImageArray(null);
			navigate('/albums')
		} 
	}, [error, isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps
		
	const handleDeleteImage = (image) => {
		setDeleteImage(image);
	}
	useDeleteImage(deleteImage);

	const creatAlbum = (checkedImages) => {
		let imagesToSave = []

		images.forEach(imgItem => {
			if (checkedImages.includes(imgItem.url)) {
				imagesToSave.push(imgItem)
			}
		})

		setNewImageArray(imagesToSave)
	}

	const handleimageCheck = (e) => {
		
		setimageCheck({...imageCheck, [e.target.name] : e.target.checked })
		
			if (newPictures.includes(e.target.name)) {
				for (let i = 0; i < newPictures.length; i++){     
					newPictures[i] === e.target.name && newPictures.splice(i, 1) 			
				}
			} else {
				newPictures.push(e.target.name)
			}
		setnewPictures(newPictures);
	}

	return (
		<SRLWrapper>
			<Row className="my-3">
				{images.map(image => (
					<Col sm={6} md={4} lg={3} key={image.url}>
						{console.log(image.url)}
						<Card className="mb-3 text-center" >
							<a  href={image.url} title="Lightbox mode" data-attribute="SRL">
								<Card.Img variant="top" src={image.url} title={image.name} />
							</a>
								{currentUser &&
									<input
										className="mt-4"
										type="checkbox"
										name={image.url}
										onChange={handleimageCheck}
									/>
								}
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
					{currentUser && newPictures && newPictures.length > 0 &&		
						<Button onClick={() => creatAlbum(newPictures)}>
							Create an album with the images you have checked above
						</Button>
					}
				</Col>				
			</Row>
		</SRLWrapper>
	)
}

export default ImageGrid

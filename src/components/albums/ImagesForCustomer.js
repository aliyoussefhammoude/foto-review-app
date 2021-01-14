import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import useSelectedImages from '../../hooks/useSelectedImages';
import LikedImages from './LikedImages'

const ImagesForCustomer = ({ images, owner, title }) => {

	// States
	const [likedImages, setLikedImages] = useState([])
	const [dislikedImages, setDislikedImages] = useState([])
	const [dislikedCheckedImage, setDislikedCheckedImage] = useState({})
	const [likedCheckedImages, setLikedCheckedImages] = useState({})
	const [newImageArray, setNewImageArray] = useState(null)
	const [errorText, setErrorText] = useState(false)
	const [reviewSelected, setReviewSelected] = useState(false)

	// Hooks
	const { selectedError, selectedSuccess } = useSelectedImages(newImageArray, owner, title);
	const navigate = useNavigate()

	// Effects
	useEffect(() => {
		if (selectedError) {
			setErrorText("Unexpected error, could not upload and create new album.")
		} else if (selectedSuccess) {
			setNewImageArray(null);
			navigate('/')
		} 
	}, [selectedError, selectedSuccess]);

	// GENERAL FUNCTIONS -->

	// Handling all the checked boxed and storing in new array
	const handleLikedCheckedImage = (e) => {
	
		setLikedCheckedImages({...likedCheckedImages, [e.target.name] : e.target.checked })
	
		if (likedImages.includes(e.target.name)) {
			for (let i = 0; i < likedImages.length; i++){     
				likedImages[i] === e.target.name && likedImages.splice(i, 1) 			
			}
		} else {
			likedImages.push(e.target.name)
		}
		setLikedImages(likedImages);
	}
		
	// Handling all the checked boxed and storing in new array
	const handleDislikedCheckedImage = (e) => {
		
		setDislikedCheckedImage({...dislikedCheckedImage, [e.target.name] : e.target.checked })
	
		if (dislikedImages.includes(e.target.name)) {
			for (let i = 0; i < dislikedImages.length; i++){     
				dislikedImages[i] === e.target.name && dislikedImages.splice(i, 1) 			
			}
		} else {
			dislikedImages.push(e.target.name)
		}
		setDislikedImages(dislikedImages);
	}

	// Create new album based on rated pictures
	const creatAlbum = (checkedImages) => {
		let imagesToSave = []

		images.forEach(imgItem => {
			if (checkedImages.includes(imgItem.url)) {
				imagesToSave.push(imgItem)
			}
		})

		setNewImageArray(imagesToSave)
	}

	const handleReview = () => {
		setReviewSelected(!reviewSelected)
	}

	return (
		<SRLWrapper>
		<p>{errorText}</p>
		{
			!reviewSelected
			 ? (
				<>
					<Row className="my-3">
						{
						images.map(image => (
							<Col sm={6} md={4} lg={3} key={image.id}>
								<Card className="mb-3">
									<a href={image.url} title="View image in lightbox" data-attribute="SRL">
										<Card.Img variant="top" src={image.url} title={image.name} />
									</a>
									<Card.Body>
										<Card.Text className="small">
											{image.name} ({Math.round(image.size/1024)} kb)
										</Card.Text>
										<label>👍
											<input
												type="checkbox"
												name={image.url}
												checked={likedCheckedImages[image.url]}
												onChange={handleLikedCheckedImage}
											/>
										</label>
										

										<label>👎</label>
										<input
											type="checkbox"
											name={image.url}
											checked={dislikedCheckedImage[image.url]}
											onChange={handleDislikedCheckedImage}
										/>

									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
					
						{images.length <= likedImages.length + dislikedImages.length  &&
							<Button onClick={handleReview}>
								Review
							</Button>
						}
				
				</>
			) : (
				<LikedImages
				likedImages={likedImages} create={creatAlbum} goBack={handleReview} dislikedImages={dislikedImages}/>
			)
		}
			
		</SRLWrapper>
	)
}

export default ImagesForCustomer

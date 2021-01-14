import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useImageChecked from '../../hooks/useImageChecked';
import ImagesReviewed from './ImagesReviewed'
import { SRLWrapper } from 'simple-react-lightbox'

const CheckCustomerImages = ({ images, owner, title }) => {

	const [ArrayImg, setArrayImg] = useState(null)
	const [errorText, setErrorText] = useState(false)
	const [CheckedReview, setCheckedReview] = useState(false)

	const [ImagesPositive, setImagesPositive] = useState([])
	const [ImagesNegative, setImagesNegative] = useState([])

	const { selectedError, selectedSuccess } = useImageChecked(ArrayImg, owner, title);

	const [ImagesNegativeChecked, setImagesNegativeChecked] = useState({})
	const [ImagesPositiveChecked, setImagesPositiveChecked] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		if (selectedError) {
			setErrorText("didnt create new album")
		} else if (selectedSuccess) {
			setArrayImg(null);
			navigate('/')
		} 
	}, [selectedError, selectedSuccess]);


	const handleReview = () => {
		setCheckedReview(!CheckedReview)
	}
		
	const handleNegativeImages = (e) => {
		
		setImagesNegativeChecked({...ImagesNegativeChecked, [e.target.name] : e.target.checked })
	
		if (ImagesNegative.includes(e.target.name)) {
			for (let i = 0; i < ImagesNegative.length; i++){     
				ImagesNegative[i] === e.target.name && ImagesNegative.splice(i, 1) 			
			}
		} else {
			ImagesNegative.push(e.target.name)
		}
		setImagesNegative(ImagesNegative);
	}

	const creatAlbum = (checkedImages) => {
		let imagesToSave = []

		images.forEach(imgItem => {
			if (checkedImages.includes(imgItem.url)) {
				imagesToSave.push(imgItem)
			}
		})

		setArrayImg(imagesToSave)
	}


	const handlePositiveImageCheck = (e) => {
	
		setImagesPositiveChecked({...ImagesPositiveChecked, [e.target.name] : e.target.checked })
	
		if (ImagesPositive.includes(e.target.name)) {
			for (let i = 0; i < ImagesPositive.length; i++){     
				ImagesPositive[i] === e.target.name && ImagesPositive.splice(i, 1) 			
			}
		} else {
			ImagesPositive.push(e.target.name)
		}
		setImagesPositive(ImagesPositive);
	}

	return (
		<SRLWrapper>
		<p>{errorText}</p>
		{
			!CheckedReview
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
												checked={ImagesPositiveChecked[image.url]}
												onChange={handlePositiveImageCheck}
											/>
										</label>
										

										<label>👎</label>
										<input
											type="checkbox"
											name={image.url}
											checked={ImagesNegativeChecked[image.url]}
											onChange={handleNegativeImages}
										/>

									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
					
						{images.length <= ImagesPositive.length + ImagesNegative.length  &&
						
							<Button onClick={handleReview}>{console.log(images)}
								Review
							</Button>
						}
				
				</>
			) : (
				<ImagesReviewed
				likedImages={ImagesPositive} create={creatAlbum} goBack={handleReview} dislikedImages={ImagesNegative}/>
			)
		}
			
		</SRLWrapper>
	)
}

export default CheckCustomerImages

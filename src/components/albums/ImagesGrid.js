import React, { useState } from 'react'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../contexts/AuthContext'
import useDeleteImage from '../../hooks/useDeleteImage'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'


const ImagesGrid = ({ images }) => {
	const [deleteImage, setDeleteImage] = useState(null);
	const { currentUser } = useAuth()
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [title, setTitle] = useState("")

	const [isChecked, setIsChecked] = useState()

	useDeleteImage(deleteImage);

	const handleDeleteImage = (image) => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Are you really sure you want to delete the image\n"${image.name}"?`)) {
			setDeleteImage(image);
		}
	}

	

	const handleTitleChange = (e) => {
		setTitle(e.target.value)
		
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const docRef = await db.collection('albums').add({
				title,
				owner: currentUser.uid,
			})

			navigate(`/albums/${docRef.id}`)
		} catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}



	return (
		<SRLWrapper>
			<p>1. Select all images you want down here <br></br>2. Enter the name of the Album you want the images you´ve chosen to be in<br></br>3. click ENTER</p>

			<Form onSubmit={handleSubmit}>

				<Form.Group id="title">
					<Form.Label>Album Name</Form.Label>
					<Form.Control type="title" onChange={handleTitleChange} value={title} required />
					{title && title.length < 4 && (
						<Form.Text className="text-danger">Please enter a title at least 4 characters long.</Form.Text>
					)}
				</Form.Group>
			</Form>


			<Row className="my-3">
				{images.map(image => (
					<Col sm={6} md={4} lg={3} key={image.id}>
						<Card className="mb-3">
							<input type="checkbox" checked={isChecked} onChange={event => {
								const checked = event.target.checked;
								images.map(data => {
									if (image.id === data.id) {
										data.check = checked;
										console.log(images)
									}
									return data;
								})
							}} className="mb-2 mt-2 ml-1"></input>
							<a href={image.url} title="View image in lightbox" data-attribute="SRL">
								<Card.Img variant="top" src={image.url} title={image.name} />
							</a>
							<Card.Body>
								<Card.Text className="text-muted small">
									{image.name} ({Math.round(image.size/1024)} kb)
								</Card.Text>
								{
									currentUser.uid === image.owner && (
										<Button variant="danger" size="sm" onClick={() => {
											handleDeleteImage(image)
										}}>
											Delete
										</Button>
									)
									
								}
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</SRLWrapper>
	)
}

export default ImagesGrid

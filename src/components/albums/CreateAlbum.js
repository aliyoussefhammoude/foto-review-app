import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebase'
import { useAuth } from '../../contexts/RouteAuth'

const CreateAlbum = () => {

	const [title, setTitle] = useState("")
	const navigate = useNavigate()
	const { currentUser } = useAuth()
	const [, setError] = useState(false)
	const [, setLoading] = useState(false)

	const handleTitleChange = (e) => {
		setTitle(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		setError(false)
		setLoading(true)
		
		try {

			setLoading(true)

			await db.collection('albums').add({
				images: [],
				title,
				owner: currentUser.uid
			})

			setLoading(true)
			navigate(`/albums`)
			
		} catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}

	return (
		<>
			<p>Create a New Album</p>

			<Form onSubmit={handleSubmit}>

				<Form.Group id="title">
					<Form.Label>Album Title</Form.Label>
					<Form.Control type="title" onChange={handleTitleChange} value={title} required />
				</Form.Group>

				<Button type="submit">Create</Button>
			</Form>
		</>
	)
}

export default CreateAlbum

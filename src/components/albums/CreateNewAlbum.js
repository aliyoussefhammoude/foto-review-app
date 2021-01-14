import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebase'
import { useAuth } from '../../contexts/ContextComp'

const CreateNewAlbum = () => {

	// States
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [title, setTitle] = useState("")

	// Hooks
	const navigate = useNavigate()

	// Contexts
	const { currentUser } = useAuth()

	// GENERAL FUNCTIONS

	// Dynamicly changes the title state
	const handleTitleChange = (e) => {
		setTitle(e.target.value)
	}

	// Submit and create new album
	const handleSubmit = async (e) => {
		e.preventDefault()

		if (title.length < 4) {
			return;
		}

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

export default CreateNewAlbum

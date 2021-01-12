import React, { useState, useEffect, useCallback } from 'react';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import { useDropzone } from 'react-dropzone';
import useUploadImage from '../../hooks/useUploadImage';
import { Form } from 'react-bootstrap'
import { db } from '../../firebase'



const UploadAlbumImage = ({ albumId }) => {
	const [uploadImage, setUploadImage] = useState(null);
	const [message, setMessage] = useState(null);
	const { uploadProgress, error, isSuccess } = useUploadImage(uploadImage, albumId);
	const [title, setTitle] = useState("")

	useEffect(() => {
		if (error) {
			setMessage({
				error: true,
				text: error,
			});
		} else if (isSuccess) {
			setMessage({
				success: true,
				text: 'Image successfully uploaded!',
			});
			// set file to upload to null to prevent duplicate uploading
			setUploadImage(null);
		} else {
			setMessage(null);
		}
	}, [error, isSuccess]);

	const onDrop = useCallback(acceptedFiles => {
		setMessage(null);

		if (acceptedFiles.length === 0) {
			return;
		}

		setUploadImage(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragAccept, isDragReject } = useDropzone({
		accept: 'image/gif, image/jpeg, image/png',
		onDrop
	});

	const handleTitleChange = (e) => {
		setTitle(e.target.value)
		console.log(e.target)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

			try {
				await db.collection('albums').doc(albumId).update({
					title
				})
			} catch (e) {
				console.log("didnt work")
			}
	
	}


	return (
	<>
		<div {...getRootProps()} id="upload-image-dropzone-wrapper" className={`text-center px-4 py-3 my-3 ${isDragAccept ? `drag-accept`: ``} ${isDragReject ? `drag-reject`: ``}`}>
			<input {...getInputProps()} />

			
			{
				isDragActive
					? isDragAccept ? <p>Drop it like it's hot! 🔥🔫</p> : <p>We don't want that file! 😨</p>
					: <p>Give me some files 😋!</p>
					
			}
								
			{acceptedFiles && (
				<div className="accepted-files mt-2">
					<ul className="list-unstyled">
						{acceptedFiles.map(file => (
							<li key={file.name}><small>{file.name} ({Math.round(file.size / 1024)} kb)</small></li>
						))}
					</ul>
				</div>
			)}

			{/* Output upload status */}
			{uploadProgress !== null && (<ProgressBar variant="success" animated now={uploadProgress} />)}

			{message && (<Alert variant={message.error ? 'warning' : 'success'}>{message.text}</Alert>)}
			
		</div>
		<p>Wanna change the name of this album? Just update the name down here and press enter</p>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Control onChange={handleTitleChange} />
				</Form.Group>
			</Form>
	</>
	)
}

export default UploadAlbumImage

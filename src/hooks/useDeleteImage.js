import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { useParams } from 'react-router-dom'

const useDeleteImage = image => {
	const [isSuccess, setIsSuccess] = useState(false)
	const [error, setError] = useState(false)

	const {albumId} = useParams()

	useEffect(() => {

		if (!image) {
			return;
		}

		(async () => {
			try {
				let getImages = await db.collection('albums').doc(albumId).get()
				const currentImages = getImages.data().images

				currentImages.forEach((img, index) => {
					if (img.url === image.url) {
						currentImages.splice(index, 1) 	
					}
				})

				await db.collection('albums').doc(albumId).update({
					images: currentImages,
				});

			} catch (error) {
				setError(true)
				setIsSuccess(false)
			}
		})();
	}, [image]); // eslint-disable-line react-hooks/exhaustive-deps

	return {error, isSuccess}
}

export default useDeleteImage
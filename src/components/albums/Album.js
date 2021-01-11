import React from 'react'
import { useParams } from 'react-router-dom'
import ImagesGrid from './ImagesGrid'
import useAlbum from '../../hooks/useAlbum'
import UploadAlbumImage from './UploadAlbumImage'

const Album = () => {
	const { albumId } = useParams()
	const { images } = useAlbum(albumId)

	return (
		<>
			

			<UploadAlbumImage albumId={albumId} />

			<hr />

			<ImagesGrid images={images} />
		</>
	)
}

export default Album

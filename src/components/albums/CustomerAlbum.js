import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import ImagesForCustomer from './ImagesForCustomer'

const ReviewAlbum = () => {

	// Hooks
	const { albumId } = useParams()
	const { album} = useAlbum(albumId)

	return (
		<>	
			{album && 
					<>
						<h1>{album.title}</h1>
						<ImagesForCustomer images={album.images} owner={album.owner} title={album.title} />
					</>
			}
		</>
	)
}

export default ReviewAlbum

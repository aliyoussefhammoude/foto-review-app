import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import CheckCustomerImages from './CheckCustomerImages'

const CheckCustomer = () => {
	const { albumId } = useParams()
	const { album} = useAlbum(albumId)

	return (
		<>	<div className="container">
			{album && 
				<>
					<h1>Album name: {album.title}</h1>
					<CheckCustomerImages 
						images={album.images} 
						owner={album.owner} 
						title={album.title} 
					/>
				</>
			}
			</div>
		</>
	)
}

export default CheckCustomer

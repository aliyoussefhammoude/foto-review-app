import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import CheckCustomerImages from './CheckCustomerImages'

const CheckCustomer = () => {

	// Hooks
	const { albumId } = useParams()
	const { album} = useAlbum(albumId)

	return (
		<>	
			{album && 
					<>
						<h1>{album.title}</h1>
						<CheckCustomerImages images={album.images} owner={album.owner} title={album.title} />
					</>
			}
		</>
	)
}

export default CheckCustomer

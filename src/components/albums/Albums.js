import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/RouteAuth'
import useAlbums from '../../hooks/useAlbums'
import AlbumsGrid from './AlbumsGrid'


const Albums = () => {
	const { albums } = useAlbums()
	const { currentUser } = useAuth()

	return (
		< >
			<h2 className="mb-3">My albums:</h2>
				<AlbumsGrid albums={albums} />
			{
				currentUser && (
					<Link to="/albums/create">
						<button>Create a new Album</button>
					</Link>
			)
			}
		</>
	)
}

export default Albums
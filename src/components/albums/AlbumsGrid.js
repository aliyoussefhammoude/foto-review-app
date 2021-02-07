import React from 'react'
import { Link } from 'react-router-dom'

const AlbumsGrid = ({ albums }) => {

	return (
		<div >
			{albums.map(album => (
				<div key={album.id}>
						<Link to={`/albums/${album.id}`}>
							<div class="container mt-5"> 
								<h3>{album.title}</h3> 
							</div>
						</Link>
				</div>
			))}
		</div>
	)
}

export default AlbumsGrid
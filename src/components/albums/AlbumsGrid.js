import React from 'react'
import { Link } from 'react-router-dom'

const AlbumsGrid = ({ albums }) => {

	return (
		<div className="albumContainer">
			{albums.map(album => (
				<div key={album.id}>
						<Link to={`/albums/${album.id}`}>
							<div> 
								 {album.title}
							</div>
						</Link>
				</div>
			))}
		</div>
	)
}

export default AlbumsGrid
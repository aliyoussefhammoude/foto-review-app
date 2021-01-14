import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div>
			<div className="page page__not-found">
				<h1>404 - ja</h1>				

				<Link to="/" className="link text-link">
					Go back
				</Link>				
			</div>
		</div>
	)
}

export default NotFound
import React from 'react';

import SimpleReactLightbox from 'simple-react-lightbox'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/Login.js';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Album from './components/Albums/Album';
import Albums from './components/Albums/Albums';
import CustomerAlbum from './components/Albums/CustomerAlbum';
import CreateNewAlbum from './components/Albums/CreateNewAlbum.js';
import MustLogIn from './components/MustLogIn'
import NavigationBar from './components/Navigation.js';
import NotFound from './components/NotFound.js';


import AuthContextProvider from './contexts/ContextComp'
import './assets/scss/app.scss'

const App = () => {

	return (
		<div className="App">
			<Router>
					<AuthContextProvider>

					<SimpleReactLightbox>

						<NavigationBar />

								<Routes>

									{/* Landing Pagge */}
									<Route path="/">
										<Login />
									</Route>

									{/* Registration, Login, Reset */}
									<Route path="/register">
										<Signup />
									</Route>

									<Route path="/reset-password">
										<ForgotPassword />
									</Route>

									{/* Restricted/Authenticated Components */}
									<MustLogIn path="/albums">

										<MustLogIn path="/">
											<Albums />
										</MustLogIn>

										<MustLogIn path="/create">
											<CreateNewAlbum />
										</MustLogIn>

										<MustLogIn path="/:albumId">
											<Album />
										</MustLogIn>
									</MustLogIn>

								
								{/* Customer Routes */}
								<Route path="/albums/:albumId/:code">
									<CustomerAlbum />
								</Route>

								{/* If Route not found */}
								<Route path="*" element={<NotFound />} />

								</Routes>
						
						</SimpleReactLightbox>

					</AuthContextProvider>
			</Router>
		</div>
	);
}

export default App;

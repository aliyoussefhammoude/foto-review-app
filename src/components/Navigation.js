import React from 'react'
import { useAuth } from '../contexts/RouteAuth'
import { Box, Flex, Spacer, Menu, MenuButton} from "@chakra-ui/react"
import { NavLink, Link } from 'react-router-dom'

const NavigationBar = () => {


	const { logout, currentUser } = useAuth()
	
    const handleLogout = () => {
        logout()
    }

    return (
		<>
			<Flex>
				<Spacer />
				<Box>
					{
						currentUser ? (
							<>
								<NavLink className="nav-links mr-5" to="/albums" m="5"><h4>Album</h4></NavLink>
								<Menu>
									<MenuButton to="/logout" onClick={handleLogout} className="btn btn-primary">Logout </MenuButton>
								</Menu>
							</>
						) : (
							<button className="nav-link btn btn-warning">
								<Link to="/">
									Login
								</Link>
							</button>
						)
					}
				</Box>
			</Flex>
		</>
    )
}

export default NavigationBar

import React from 'react'
import { useAuth } from '../contexts/ContextComp'
import { NavLink } from 'react-router-dom'
import { Box, Flex, Spacer, Heading, Button, MenuItem, MenuGroup, Menu, MenuButton, MenuList} from "@chakra-ui/react"

const NavigationBar = () => {

    // Context
    const { logout, currentUser } = useAuth()

   	// GENERAL FUNCTIONS

    // Handle the submitting of logout
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
								<NavLink className="nav-links" to="/albums" m="5">Album</NavLink>
								<Menu>
									<MenuButton to="/logout" onClick={handleLogout} >Logout </MenuButton>
								</Menu>
							</>
						) : (
							console.log("login")
						)
					}
				</Box>
			</Flex>
		</>
    )
}

export default NavigationBar

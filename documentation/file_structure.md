## Application Structure

client

	- main.html  #Rendering target
	- main.js    #Import client-side startup files 
imports #All files that will not be eagerly loaded at application startup

	- api
		- events
			- server
				- publications.js #For Read operations, controls who can see information
				- publications.tests.js
			- index.js # Imports API
			- methods.js # Create, Update, and Delete
			- methods.tests.js
			- events.js # Initialize Events db Schema
			- events.tests.js
		- lists
			- index.js
			- lists.js # Package for mocking relations, sets up links
		- profiles
			- server
				-publications.js
				-publications.tests.js
			- index.js
			- methods.js
			- methods.tests.js
			- profiles.js
			- profiles.tests.js
		- index.js
		- startup # code that needs to be imported on startup
			- client
				- routes.js #routes that will appear in the application
				- index.js
				- useraccounts-configuration.js #configuration files go here
			- index.js
		- ui
			-components #React components
				- MeModal.js
				- Navbar.js
				- VerticalMenu.js
				- Card.js
			- pages #Page-level design
				- EventsPage.js
				- HomePage.js
				- ProfilePage.js
				- SignUpPage.js
				- WelcomePage.js
			- AccountsUIWrapper.js
			- App.js #Target for router
		- mosaic.json #mosaic of images
public #store static files
	- images
server #expose publications here and import server startup files
	- main.js

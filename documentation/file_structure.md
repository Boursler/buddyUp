# Application Structure

**client**

	- main.html
**imports**

	- api
		- events
			- server
				- publications.js
				- publications.tests.js
			- index.js
			- methods.js
			- methods.tests.js
			- events.js
			- events.tests.js
		- lists
			- index.js
			- lists.js
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
		- startup
			- client
				- routes.js
				- index.js
				- useraccounts-configuration.js
			- index.js
		- ui
			-components
				- MeModal.js
				- Navbar.js
				- VerticalMenu.js
				- Card.js
			- pages
				- EventsPage.js
				- HomePage.js
				- ProfilePage.js
				- SignUpPage.js
				- WelcomePage.js
			- AccountsUIWrapper.js
			- App.js
		- mosaic.json
	- public
		- images
	- server
		- main.js

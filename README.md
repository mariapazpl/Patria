# [Patria Website](https://patria.mariaparedes.ca/)

Patria - A web platform dedicated to food enthusiasts offering a register/login/authentication system, a blog section for sharing 
traditional recipes and a marketplace for buying and selling home-cooked meals. Please access the website here: https://patria.mariaparedes.ca

## UX/UI Design Principles Used
- User-centered design, visual and typographic hierarchy, user control, consistency, usability
- Please see UX_Iterations.md for record log of the iterative design process

## Technologies Used

- **Frontend:**
  - EJS (Embedded JavaScript) for dynamic HTML templates
  - JavaScript for client-side interactivity
  - CSS for styling with an earthy color theme

- **Backend:**
  - Node.js for server-side JavaScript
  - Express.js framework as our application server
  - Passport.js to help manage the logged in state of users
  - Hosted on an Amazon EC2 Ubuntu instance

In this implementation, we use in-memory data structures to simulate an underlying database. In future iterations we will integrate a database component to allow for persistent storage.

## Project Structure

The project structure includes various folders and files:

- **views:** Contains EJS templates for rendering HTML pages.
- **public:** Holds static assets like images, stylesheets, and client-side scripts.
- **passport-config:** Includes the configuration file for Passport.js.
- **server.js:** The main entry point of the application.

## Getting Started

To run the project locally, follow these steps:

1. Install npm.
2. Clone the repository.
3. Navigate to the repository.
4. Run the application with `npm run devStart`.
5. Access the website at `http://localhost:5005`.

## Development Roadmap

1. Refactor posts and comments into server.js to better simulate stateful behaviour
2. Store user and application data in a relational database as opposed to in memory on the API server
3. Conduct formal usability studies to further improve the user experience and interface

## Feedback and Contributions

As Patria is still in its early stages, your feedback and contributions are highly 
appreciated. Feel free to reach out to María Paredes at Maria.Paredes@torontomu.ca with 
any suggestions or bug reports.

## Demo video


https://github.com/mariapazpl/Patria/assets/153972139/97b5b352-806c-46e4-9a42-499e8e4b08ff



Thank you for your interest in Patria! Buen Provecho!

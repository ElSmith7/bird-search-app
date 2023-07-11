# Bird Search

Welcome to Bird Search! It's a neat little app designed to easily manage and update your list of different birds you've seen. With Bird Search, you can view bird images, their names, and keep track of the number of sightings which can be updated as you continue your bird watching adventures!

## Features

- **Lazy Loading:** Bird Search utilizes lazy loading to optimize performance and enhance user experience by loading bird images only when necessary.
- **Comprehensive Testing:** The app is thoroughly tested using React Testing Library and Jest, covering unit, integrated, and end-to-end testing scenarios.

## Availability

The code for Bird Search is provided for showcasing purposes only and is not intended for public use.

## Dependencies

Some of the libraries and plugins used:

- [react](https://reactjs.org/): A JavaScript library for building user interfaces.
- [@reduxjs/toolkit](https://redux-toolkit.js.org/): A package for efficient state management in React applications.
- [json-server](https://www.npmjs.com/package/json-server): A simple JSON-based local server for development and prototyping.
- [axios](https://www.npmjs.com/package/axios): A promise-based HTTP client for making API requests.
- [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer): A React wrapper for the Intersection Observer API.
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/): A testing utility for testing React components.
- [msw](https://mswjs.io/): A library for mocking HTTP requests during testing.

## Installation

To review and evaluate Bird Search, please follow the instructions below:

1. Clone the repository:

```shell
git clone https://github.com/ElSmith7/bird-search-app.git
```

2. Navigate to the project directory:

```shell
cd bird-search-app
```

3. Install the required dependencies:

```shell
npm install
```

## Usage

1. Start the local server:

```shell
npm run start:server
```

2. Launch the application:

```shell
npm start
```

3. Open your web browser and navigate to `http://localhost:3000` to access Bird Search.

## Bird Data

Bird Search utilizes a local `db.json` server to store bird data. The `db.json` file contains a list of birds with their corresponding IDs, names, and sighting counts.

```json
{
  "birds": [
    {
      "id": "oUHpK5t7IUtDjiJd9woGp",
      "name": "blue tit",
      "number": "4"
    },
    {
      "id": "1vrfrgDk4Uzh0nv6zRFof",
      "name": "grey heron",
      "number": "1"
    }
  ]
}
```

Please note that this is a simplified example for showcasing purposes.

## Contact

Thank you for taking a look at my Bird Search app! I am open to feedback and eager to learn and improve my work so feel free to drop a comment!

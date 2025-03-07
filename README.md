# JSON Server Clone

This repository contains a cloned JSON Server for managing a mock database for development and testing purposes.

## Features
- Simulates a REST API with a simple JSON file.
- Supports CRUD operations (Create, Read, Update, Delete).
- Custom routes and middleware support.
- Useful for frontend development and prototyping.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed, then run:

```sh
npm install -g json-server
```

## Usage

1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Start the server:
   ```sh
   json-server --watch db.json --port 3000
   ```
3. Access your mock API at:
   ```
   http://localhost:3000
   ```

## Customization

You can modify `db.json` to include custom endpoints and data structures.

### Adding Routes
Modify `db.json` to define resources, for example:
```json
{
  "books": [
    { "id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" }
  ],
  "users": [
    { "id": 1, "name": "John Doe", "email": "john@example.com" }
  ]
}
```

## Contributing
Feel free to fork this repository and submit pull requests with improvements.

## License
This project is licensed under the MIT License.


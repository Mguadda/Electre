
# Electre

Electre is a website that uses a Python REST API to calculate using the Electre method for multi-criteria decision making of AR platforms. The front end is built with React.

## Getting Started

### Backend Setup

1. Navigate to the project directory:
   ```bash
   cd path/to/your/project
   ```

2. (Optional) Create a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the `Front` directory:
   ```bash
   cd Front
   ```

2. Install the required Node packages:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Usage

The backend has one endpoint `/electre` that takes in a POST request with the rows from a frontend table. 

### Example POST Request to `/electre`

```json
{
  "rows": [
    // Your data here
  ]
}
```

## Project Structure

```
├── app.py
├── requirements.txt
├── Front
│   ├── public
│   ├── src
│   ├── package.json
│   └── ...
└── README.md
```

## License

This project is licensed under the MIT License.

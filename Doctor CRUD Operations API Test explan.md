 # Doctor CRUD Operations API Test Process

This API allows users to perform CRUD operations on doctors' profiles. It includes features such as creating a doctor profile, editing doctor information, deleting a doctor profile, adding patients to a doctor's list, viewing a doctor's patients, and viewing reviews for a doctor.

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Installation

Clone the repository:

```bash
git clone https://github.com/username/doctor-crud-api.git
```

Install the dependencies:

```bash
cd doctor-crud-api
npm install
```

## Setup

Create a `.env` file in the root directory of the project and add the following environment variables:

```
MONGODB_URI=mongodb://localhost:27017/doctor-crud-api
JWT_SECRET=your-secret-key
```

Replace `your-secret-key` with a strong secret key.

## Running the API

To start the API, run the following command:

```bash
npm start
```

The API will be available at `http://localhost:3000`.

## Usage

### Creating a Doctor Profile

To create a doctor profile, send a POST request to the `/doctors` endpoint with the following JSON body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "location": "New York",
  "specialty": "Cardiology"
}
```

The response will be a JSON object representing the newly created doctor profile:

```json
{
  "_id": "5f4dcc63fb7c4a13d8448f16",
  "firstName": "John",
  "lastName": "Doe",
  "location": "New York",
  "specialty": "Cardiology"
}
```

### Editing Doctor Information

To edit a doctor's information, send a PUT request to the `/doctors/:id` endpoint with the following JSON body:

```json
{
  "firstName": "Jane",
  "specialty": "Neurology"
}
```

Replace `:id` with the ID of the doctor you want to edit.

The response will be a JSON object representing the updated doctor profile:

```json
{
  "_id": "5f4dcc63fb
}
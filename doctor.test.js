// Import required modules
const request = require('supertest'); // Import supertest for API testing
const app = require('../src/index'); // Import the Express app
const Doctor = require('../src/doctor.model'); // Import the Doctor model
const dbHandler = require('../test/db-handler'); // Import the database handler

// Connect to the database before all tests
beforeAll(async () => {
  await dbHandler.connect();
});

// Clear the database after each test
afterEach(async () => {
  await dbHandler.clearDatabase();
});

// Close the database connection after all tests
afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe('Doctor CRUD operations', () => {
  // Test for creating a doctor profile
  it('creates a doctor profile', async () => {
    // Create a new doctor object
    const doctor = await Doctor.create({
      firstName: 'John',
      lastName: 'Doe',
      location: 'New York',
      specialty: 'Cardiology',
    });

    // Check if the doctor object has the expected properties
    expect(doctor._id).toBeDefined();
    expect(doctor.firstName).toBe('John');
    expect(doctor.lastName).toBe('Doe');
    expect(doctor.location).toBe('New York');
    expect(doctor.specialty).toBe('Cardiology');
  });

  // Add more tests for editing, deleting, adding patients, viewing patients, and reviews
});

describe('/doctors/:id endpoint', () => {
  let token;

  // Authenticate the user and get a token before each test
  beforeEach(() => {
    return request(app)
      .post('/auth')
      .send({ username: 'johndoe', password: 'password123' })
      .then((res) => {
        token = res.body.token;
      });
  });

  // Test for getting a single doctor by ID
  test('GET /doctors/:id - Returns a single doctor by id', async () => {
    // Create a new doctor object
    const doctor = await Doctor.findByIdAndAdd({ _id: mongoose.Types.ObjectId() });

    // Send a GET request to the /doctors/:id endpoint with the doctor's ID
    const response = await request(app)
      .get(`/doctors/${doctor._id}`)
      .set('Authorization', `Bearer ${token}`);

    // Check if the response status is 200 and the returned doctor's firstName matches the original doctor's firstName
    expect(response.status).toEqual(200);
    expect(response.body.firstName).toEqual(doctor.firstName);
  });

  // Test for getting a doctor by an invalid ID
  test('GET /doctors/:id - Returns 404 if no doctor with given id', async () => {
    // Send a GET request to the /doctors/:id endpoint with an invalid ID
    const response = await request(app)
      .get('/doctors/123456789')
      .set('Authorization', `Bearer ${token}`);

    // Check if the response status is 404
    expect(response.status).toEqual(404);
  });

  // Test for updating a doctor's information
  test('PUT /doctors/:id - Updates a doctors information', async () => {
    // Create a new doctor object
    const originalDoctor = await Doctor.create({ firstName: 'John', lastName: 'Doe' });

    // Create an updated doctor object
    const updatedDoctor = { firstName: 'Jane', specialty: 'Neurology' };

    // Send a PUT request to the /doctors/:id endpoint with the updated doctor object
    const response = await request(app)
      .put(`/doctors/${originalDoctor._id}`)
      .send(updatedDoctor)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // Check if the response status is 200 and the returned doctor's firstName matches the updated doctor's firstName
    expect(response.status).toEqual(200);
    expect(response.body.firstName).toEqual(updatedDoctor.firstName);
  });
});
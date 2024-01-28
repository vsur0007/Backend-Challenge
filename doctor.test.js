const request = require('supertest');
const app = require('../src/index');
const Doctor = require('../src/doctor.model');
const dbHandler = require('../test/db-handler');

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe('Doctor CRUD operations', () => {
  it('creates a doctor profile', async () => {
    const doctor = await Doctor.create({
      firstName: 'John',
      lastName: 'Doe',
      location: 'New York',
      specialty: 'Cardiology',
    });

    expect(doctor._id).toBeDefined();
    expect(doctor.firstName).toBe('John');
    expect(doctor.lastName).toBe('Doe');
    expect(doctor.location).toBe('New York');
    expect(doctor.specialty).toBe('Cardiology');
  });

  // Add more tests for edit, delete, add patients, view patients, and reviews
  });

describe('/doctors/:id endpoint', () => {
  let token;
  beforeEach(() => {
    return request(app)
      .post('/auth')
      .send({ username: 'johndoe', password: 'password123' })
      .then((res) => { token = res.body.token; });
  });

  test('GET /doctors/:id - Returns a single doctor by id', async () => {
    const doctor = await Doctor.findByIdAndAdd({ _id: mongoose.Types.ObjectId() });
    const response = await request(app)
      .get(`/doctors/${doctor._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.firstName).toEqual(doctor.firstName);
  });

  test('GET /doctors/:id - Returns 404 if no doctor with given id', async () => {
    const response = await request(app)
      .get('/doctors/123456789')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(404);
  });

  test('PUT /doctors/:id - Updates a doctors information', async () => {
    const originalDoctor = await Doctor.create({ firstName: 'John', lastName: 'Doe' });
    const updatedDoctor = { firstName: 'Jane', specialty: 'Neurology' };
    const response = await request(app)
      .put(`/doctors/${originalDoctor._id}`)
      .send(updatedDoctor)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.firstName).toEqual(updatedDoctor.firstName); 
})})
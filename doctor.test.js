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
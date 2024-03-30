import request from 'supertest';
import { app } from '../../app';

const PATH = "/api/auth/signup"

it('returns a 201 on success signup', async () => {
    return request(app)
        .post('/api/auth/signup')
        .send({
            email: "goodEmail@gmail.com",
            password: "goodPassword"
        })
        .expect(201);
});

it('returns 400 on invalid email', async () => {
    return request(app)
        .post('/api/auth/signup')
        .send({
            email: "bademail.com",
            password: "goodPassword"
        })
        .expect(400);
})

it('return 400 on invalid password', async() => {
    return request(app)
        .post('/api/auth/signup')
        .send({
            email: "bademail.com",
            password: "bad"
        })
        .expect(400);
})

it('disallows duplicate emails', async () => {
    await request(app)
      .post(PATH)
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    await request(app)
      .post(PATH)
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(400);
  });
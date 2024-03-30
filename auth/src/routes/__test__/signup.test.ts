import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

const PATH = "/api/auth/signup"

jest.fn(natsWrapper.client.publish);

it('returns a 201 on success signup', async () => {
    return request(app)
        .post('/api/auth/signup')
        .send({
            email: "goodEmail@gmail.com",
            password: "goodPassword"
        })
        .expect(201);
});

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
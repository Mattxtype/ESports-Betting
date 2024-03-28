import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on success signup', async () => {
    return request(app)
        .post("/api/auth/signup")
        .send({
            email: "goodEmail@gmail.com",
            password: "goodPassword"
        })
        .expect(201);
});

it('returns ')
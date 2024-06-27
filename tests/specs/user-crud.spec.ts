import * as supertest from 'supertest';
const token = process.env.TOKEN;
const request = supertest(process.env.BASE_URL as string);
const create = require('../data/create.json');
let userId;
let name;
let email; 
let gender;
let status;

describe('User CRUD Tests', () =>{
       it('Should validate /POST Create new user', async () => {
        const response = await request.post(`/public/v2/users`)
            .send(create)
            .set('Authorization', `Bearer ${token}`)
        if (response.statusCode === 401){
            console.log('Unauthorized.');
        }
        if (response.statusCode === 422){
            console.log(response.body);
        }
        userId = response.body.id;
        name = response.body.name;
        email = response.body.email;
        gender = response.body.gender;
        status = response.body.status;
        expect(response).toBeDefined();
        expect(Number.isInteger(userId)).toBe(true);
        expect(name).toBe(create.name); 
        expect(email).toBe(create.email); 
        expect(gender).toBe(create.gender); 
        expect(status).toBe(create.status);
    })

    it('Should validate /GET get user details', async () => {
        if (userId === undefined || userId === null){
            console.log('userId is undefined or null. Creating new user.');
            const response = await request.post(`/public/v2/users?`)
            .send(create)
            .set('Authorization', `Bearer ${token}`);
            userId = response.body.id;
        }
        const response = await request.get(`/public/v2/users/${userId}?`)
            .set('Authorization', `Bearer ${token}`);
        expect(response).toBeDefined();
        expect(200);
        expect(Number.isInteger(userId)).toBe(true);
        expect(response.body.id).toEqual(userId); 
        expect(response.body.name).toEqual(name);
        expect(response.body.email).toEqual(email);
        expect(response.body.gender).toEqual(gender);
        expect(response.body.status).toEqual(status);
    })

    it('Should validate /PATCH update user details', async () => {
        // We are using PATCH because we do not want to update all fields;
        const data = {
            name: "Jane Doe Jr.",
        }
        if (userId === undefined || userId === null){
            console.log('userId is undefined or null. Creating new user.');
            const response = await request.post(`/public/v2/users?`)
            .send(create)
            .set('Authorization', `Bearer ${token}`);
            userId = response.body.id;
        }
        const getUser = await request.get(`/public/v2/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        const name1 = getUser.body.name;
        const response = await request.patch(`/public/v2/users/${userId}`)
            .send(data)
            .set('Authorization', `Bearer ${token}`);
        expect(200);
        expect(Number.isInteger(userId)).toBe(true);
        expect(response.body.id).toEqual(userId); 
        expect(response.body.name).not.toBe(name1);
        expect(response.body.email).toEqual(email);
        expect(response.body.gender).toEqual(gender);
        expect(response.body.status).toEqual(status);
        })

    it('Should validate /DELETE user', async () => {
        const getUser = await request.get(`/public/v2/users/${userId}?`)
            .set('Authorization', `Bearer ${token}`);
        if (userId === undefined || userId === null){
            console.log('userId is undefined or null. Creating new user.');
            const response = await request.post(`/public/v2/users?`)
            .send(create)
            .set('Authorization', `Bearer ${token}`);
            console.log(response.body);
            userId = response.body.id;
        }
        console.log(userId);
        const response = await request.delete(`/public/v2/users/${userId}?`)
            .set('Authorization', `Bearer ${token}`);
        expect(204);
        expect(response).toBeDefined();
    })

    it('Should validate /DELETE user failure', async () => {
        const response = await request.delete(`/public/v2/users/${userId}?`)
            .set('Authorization', `Bearer ${token}`);
        expect(response).toBeDefined();
        expect(404);
    })

    it('Should validate /GET deleted user failure', async () => {
        const response = await request.delete(`/public/v2/users/${userId}?`)
            .set('Authorization', `Bearer ${token}`);
        expect(response).toBeDefined();
        expect(404);
        expect(response.body).toEqual({ message: 'Resource not found' });
    })
})
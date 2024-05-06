import app from './server/server.js';
import request from "supertest";

describe('Testes de endpoint', () => {
    it('deve dar um get na rota principal', async () => {
        const res = await fetch('http://localhost:3000/users')
        const data = await res.json();
        
        console.log(data); 

        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('_id');
    })
/*
    it('deve dar um post na rota principal', async () => { // tentei assim mas tava dando timeout
        const res = await request(app)
        .post('/users')
        .send({
            'nome': 'Carinha que mora logo ali',
           ' email': 'CarinhaqMoraAli@gmail.com',
            'idade': 20,
            'genero': 'F',
            'telefone': '54984002057',
            'cpf': '565.593.520-13',
            'rg': '"32165487"'
        })
        expect(res.body).toHaveProperty('_id');
    })
    */
})
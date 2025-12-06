import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { createHash } from './index.js';

class Mocking {
    static async generateUsers(count = 50) {
        try {
            const users = [];
            const encryptedPassword = await createHash('coder123');
            
            for (let i = 0; i < count; i++) {
                const user = {
                    _id: faker.database.mongodbObjectId(),
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    email: faker.internet.email(),
                    password: encryptedPassword,
                    role: faker.helpers.arrayElement(['user', 'admin']),
                    pets: [],
                    createdAt: faker.date.recent(),
                    updatedAt: faker.date.recent()
                };
                users.push(user);
            }
            
            return users;
        } catch (error) {
            throw new Error(`Error generating mock users: ${error.message}`);
        }
    }

    static generatePets(count = 50) {
        const pets = [];
        const species = ['perro', 'gato', 'conejo', 'hamster', 'pájaro', 'pez', 'tortuga'];
        
        for (let i = 0; i < count; i++) {
            const pet = {
                _id: faker.database.mongodbObjectId(),
                name: faker.person.firstName(),
                specie: faker.helpers.arrayElement(species),
                birthDate: faker.date.past({ years: 10 }),
                adopted: faker.datatype.boolean(),
                owner: faker.datatype.boolean() ? faker.database.mongodbObjectId() : null,
                image: faker.image.url(),
                createdAt: faker.date.recent(),
                updatedAt: faker.date.recent()
            };
            pets.push(pet);
        }
        
        return pets;
    }
}

export default Mocking;
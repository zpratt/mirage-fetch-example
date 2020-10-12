const {afterEach, beforeEach, describe, it} = require('@jest/globals');
const {createServer, Model} = require('miragejs');
const Chance = require('chance');

const {findAllPizzas} = require('../src/api-client');

describe('API Client', () => {
    let chance, server;

    beforeEach(() => {
        chance = new Chance();

        server = createServer({
            models: {
                pizza: Model
            },
            routes() {
                this.namespace = 'api';
                this.resource('pizza');
                this.get('/pizzas', (schema) => {
                    return schema.pizzas.all();
                });
            },
            seeds(server) {
                const firstPizza = {
                    name: chance.string()
                };

                server.create('pizza', firstPizza);
            }
        });
    });

    afterEach(() => {
        server.shutdown();
    });

    it('should return a list of pizzas', async () => {
        const expectedPizzas = server.schema.pizzas.all();

        const result = await findAllPizzas();

        expectedPizzas.models.forEach((expectedPizza, index) => {
            expect(result[index].name).toEqual(expectedPizza.name);
        });
    });
});
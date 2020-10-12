require('isomorphic-fetch');

const findAllPizzas = async () => {
    const response = await fetch('/api/pizzas');
    const responseBody = await response.json();

    return responseBody.pizzas;
};

module.exports = {
    findAllPizzas
};

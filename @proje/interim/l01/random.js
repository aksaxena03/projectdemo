const faker = require('@faker-js/faker');

const generateRandomData = () => {
    return {
        title: "",
        description: "",
        price: faker.datatype.number({ min: 1, max: 100 }),
        location: faker.address.city(),
        image: faker.image.imageUrl(),
        country: faker.address.country()
    };
};

const randomData = [];
for (let i = 0; i < 10; i++) {
    randomData.push(generateRandomData());
}

console.log(randomData);
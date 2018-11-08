var faker = require('faker')

function generateJSON(){
    var data = {}
    data.id = faker.random.number()
    data.firstName = faker.name.firstName()
    data.lastName = faker.name.lastName()
    data.specialUser = faker.random.boolean()
    data.userCredit = null
    data.userImages = new Array(5).fill(null).map( (e) => e = faker.image.image())
    data.settings = { 
        avatar: faker.internet.avatar(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
    data.orders = new Array(10).fill(null).map((e) =>{
      return {
            order_id: faker.random.number(),
            placed: faker.date.past(),
            amount: faker.finance.amount(),
            currency: faker.finance.currencyCode(),
            payment_received: faker.random.boolean()
        }   
    })
    return data;
}

module.exports.generateJSON = generateJSON
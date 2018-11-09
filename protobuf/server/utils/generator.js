var faker = require('faker')

function generateJSON(){
    var data = {}
    data.id = faker.random.uuid()
    data.index = faker.random.number()
    data.guid = faker.random.uuid()
    data.balance = faker.finance.currencySymbol() + faker.finance.amount()
    data.image = faker.image.avatar()
    data.age = faker.random.number(90)
    data.eyeColor = faker.commerce.color()
    data.name = faker.name.findName()
    data.gender = faker.random.arrayElement(['female', 'male'])
    data.company = faker.company.companyName()
    data.email = faker.internet.email()
    data.phone = faker.phone.phoneNumber()
    data.address = faker.address.streetAddress()
    data.about = faker.lorem.paragraph(3)
    data.registered = faker.date.past()
    data.latitude = faker.address.latitude()
    data.longitude = faker.address.longitude()
    data.tags = new Array(7).fill(null).map( (e) => e = faker.lorem.word())
    data.friends = new Array(3).fill(null).map((e) =>{
      return {
            id: faker.random.number(),
            name: faker.name.findName()
        }   
    })
    return data;
}

module.exports.generateJSON = generateJSON
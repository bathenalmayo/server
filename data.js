const { v4: uuidv4 } = require('uuid');
uuidv4();
//fake data
module.exports = [
    {
        id: uuidv4(),
        name : "Apples",
        qty : 5
    },
    {
        id: uuidv4(),
        name : "Bread",
        qty : 2
    },
    {
        id: uuidv4(),
        name : "Dog food",
        qty : 1
    }
]
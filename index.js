const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI)
    .then(x => {
        console.log(`Connected to the database: "${x.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany()
    })
    .then(() => {

        const newRecipe = {
            title: "Brown Cookies",
            level: 'Easy Peasy',
            cuisine: 'American',
            dishType: "snack"
        }
        Recipe.create(newRecipe)
            .then((result) => console.log(`${result.title} recipe has been created and saved`))
            .catch((error) => console.log(`An error happened while saving ${error}`))

        // iteration 3
        Recipe.insertMany(data)
            .then((result) => {
                result.forEach((recipe) => {
                    console.log(`${recipe.title} has been created and saved`)
                })
            })
            .catch((error) => console.log(`An error happened while saving ${error}`))

        // iteration 4

        Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
            .then(() => console.log(`The recipe "Rigatoni alla Genovese" has been updated`))
            .catch((error) => console.log(`An error happened while saving ${error}`))

        // iteration 5

        Recipe.deleteOne({ title: 'Carrot Cake' })
            .then(() => console.log(`The recipe "Carrot Cake" has been removed`))
            .catch((error) => console.log(`An error happened while saving ${error}`))

            .then(() => {
                mongoose.connection
                    .close()
                    .then(() => console.log(`connection closed`))
                    .catch((error) => console.log(`an error while closing database connection has occurred: ${error}`))
            });
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });
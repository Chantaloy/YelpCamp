const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require ('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
})

const db = mongoose.connection; 
db.on('error', console.error.bind (console, 'connection error:')); 
db.once ('open', ()=> {
    console.log ('Database connected')
})

const sample = array => array[Math.floor(Math.random()*array.length)] 

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i=0; i<300; i++) {
        const random1000 = Math.floor(Math.random()*1000)
        const price = Math.floor(Math.random()*20)+10
        const camp = new Campground ({
            author:'602d46f2d889f404c41d52c9',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ut similique pariatur, asperiores earum sequi magni corrupti ipsum, labore ipsa animi numquam praesentium. Illo similique provident ipsa aliquam facere itaque?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/chantaloy/image/upload/v1613864472/YelpCamp/wnw88jngljyagezkgklo.jpg',
                    filename: 'YelpCamp/wnw88jngljyagezkgklo'              
                },
                {
                    url: "https://res.cloudinary.com/chantaloy/image/upload/v1613765994/YelpCamp/il8b5loq0ftgfdbqembt.jpg",
                    filename: "YelpCamp/il8b5loq0ftgfdbqembt"
                }
            ]


    })
        await camp.save()
    }
    
}

seedDB().then(()=>{
    mongoose.connection.close()
})


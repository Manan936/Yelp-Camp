const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const campground = require("../models/campground");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH MONGO ERROR!!!!");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new campground({
      author: "63aa895f8403d881ccdeb382",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: ` https://source.unsplash.com/collection/483251/${i}`,
      // url: ` https://source.unsplash.com/collection/483251/${i}`,
      // filename: " ",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt illum eos possimus, excepturi explicabo, iure cumque iste accusamus sint fuga facilis repudiandae id reiciendis vitae modi quis nesciunt, quos nemo.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/duspn0wxe/image/upload/v1672328172/YelpCamp/dz9skrecrb1lp7pdh3hm.jpg",
          filename: "YelpCamp/dz9skrecrb1lp7pdh3hm",
        },
        {
          url: "https://res.cloudinary.com/duspn0wxe/image/upload/v1672165186/YelpCamp/vhcoeqcism8cxhnhsghl.jpg",
          filename: "YelpCamp/vhcoeqcism8cxhnhsghl",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

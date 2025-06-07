const mongoose = require("mongoose");
const data = require("./sampleData");
const Listing = require("../models/listing");

main().then( () => {
    console.log("DB connected...");
}).catch( (err) => {
    console.log(err);
    
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

// app.get("/testListing", async(req, res) => {
//     let  sampleListing = new Listing( {
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved...:)");
//     res.send("testing successful...");
    
// });

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(data);
    console.log("Data initialized");
    
}

initDB();
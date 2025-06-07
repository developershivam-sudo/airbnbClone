const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

main().then( () => {
    console.log("DB connected...");
}).catch( (err) => {
    console.log(err);
    
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/listings"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")))

//home route
app.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", {allListings});
    
})

// Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", {allListings});
});

//new route
app.get("/listings/new", (req, res) => {
    res.render("new.ejs");
})

// show route
app.get("/listings/:id", async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("show.ejs", {listing});
})


//create listing
app.post("/listings/create", async(req, res) =>{
    // let {title, description, image, price, location, country} = req.body;
    // const listing = new Listing({title, description, image, price, location, country})

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//edit
app.get("/listings/:id/edit", async (req, res) => {
    const {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("edit.ejs", {listing});
})

//update Route
app.put("/listings/:id", async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id", async(req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");

})

app.listen(8080, () => {
    console.log("Server listening on http://localhost:8080");
    
})
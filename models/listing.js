const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default:"https://i.ytimg.com/vi/0cBHsTq6nFI/hq2.jpg?sqp=-oaymwEoCOADEOgC8quKqQMcGADwAQH4Ac4FgAKACooCDAgAEAEYPyBXKGUwDw==&rs=AOn4CLCr2bHJ85WcRTUrbH-ACZIdlLp_Qw",     
        set: (v) => v === "" ? "https://i.ytimg.com/vi/0cBHsTq6nFI/hq2.jpg?sqp=-oaymwEoCOADEOgC8quKqQMcGADwAQH4Ac4FgAKACooCDAgAEAEYPyBXKGUwDw==&rs=AOn4CLCr2bHJ85WcRTUrbH-ACZIdlLp_Qw" : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
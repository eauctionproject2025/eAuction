const Auction = require("../models/Auction");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

//  GET /api/auctions — Public route
const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().sort({ createdAt: -1 })
      .populate("seller", "username email")
      .populate("winner", "username"); 
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch auctions" });
  }
};

//  POST /api/auctions — Protected, only sellers
const createAuction = async (req, res) => {
  try {
    const { title, description, startingBid, startTime, endTime } = req.body;
    const seller = req.user.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Upload all files in parallel
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });
    });

    const results = await Promise.all(uploadPromises);

    const imageUrls = results.map(r => r.secure_url);
    const cloudUrls = results.map(r => r.public_id);

    const newAuction = new Auction({
      title,
      description,
      startingBid,
      startTime,
      endTime,
      seller,
      imageUrls,      
      cloudUrls,      
    });

    await newAuction.save();
    res.status(201).json(newAuction);
  } catch (error) {
    console.error('Auction create error:', error);
    res.status(500).json({ message: error.message });
  }
};


//  GET /api/auctions/:id — Public
const getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate("seller", "username email") // show seller info
      .populate("bids.bidder", "username") // show bidder usernames
      .populate("winner", "username");

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    const now = new Date();
    if (
      now > new Date(auction.endTime) &&
      !auction.winner &&
      auction.bids.length > 0
    ) {
      // Sort bids by amount (highest last)
      const highestBid = auction.bids.reduce((prev, current) =>
        prev.amount > current.amount ? prev : current
      );

      auction.winner= highestBid.bidder;
      // auction.winner.username = highestBid.bidder.username;
      await auction.save();
    }

    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch auction" });
  }
};

//  DELETE /api/auctions/:id — Protected, only owner
const deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // Check if the logged-in user is the creator
    if (auction.seller.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this auction" });
    }
    
    // Delete image from Cloudinary
    for (const publicId of auction.cloudUrls) {
      await cloudinary.uploader.destroy(publicId);
    }


    await auction.deleteOne();
    res.json({ message: "Auction deleted" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};

//  POST /api/auctions/:id/bid — Protected
const placeBid = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) return res.status(404).json({ message: "Auction not found" });

    const { amount } = req.body;
    const bidderId = req.user.id;

    //  Must be higher than current highest bid or startingBid
    const highestBid =
      auction.bids.length > 0
        ? Math.max(...auction.bids.map((b) => b.amount))
        : auction.startingBid;

    if (amount <= highestBid) {
      return res
        .status(400)
        .json({ message: "Bid must be higher than current bid" });
    }

    auction.bids.push({ amount, bidder: bidderId, time: new Date() });
    // Update the starting bid to the latest bid
    auction.startingBid = amount;

    await auction.save();

    res.status(201).json({ message: "Bid placed successfully", auction });
  } catch (error) {
    res.status(500).json({ message: "Failed to place bid" });
  }
};

//Fetch auctions by userId
const getAuctionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user's details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch auction history based on the user's role
    let history = [];
    if (user.role === 'seller') {
      history = await Auction.find({ seller: userId });
    } else if (user.role === 'buyer') {
      history = await Auction.find({ 'bids.bidder': userId });
    }

    if (!history.length) {
      return res.status(404).json({ message: 'No auctions found for this user' });
    }

    res.json(history);
  } catch (err) {
    console.error('Error fetching auctions by userId:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllAuctions,
  createAuction,
  getAuctionById,
  deleteAuction,
  placeBid,
  getAuctionsByUserId,
};

const Auction = require('../models/Auction');
const cloudinary = require('../config/cloudinary');


// 🔽 GET /api/auctions — Public route
const getAllAuctions = async (req, res) => {
    try {
      const auctions = await Auction.find().sort({ createdAt: -1 });
      res.status(200).json(auctions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch auctions' });
    }
  };
  

  // 🆕 POST /api/auctions — Protected, only sellers
const createAuction = async (req, res) => {
  try {
    const { title, description, startingBid } = req.body;
    const seller = req.user.id;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const newAuction = new Auction({
      title,
      description,
      startingBid,
      seller,
      imageUrl: result.secure_url,
    });

    await newAuction.save();
    res.status(201).json(newAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllAuctions,
    createAuction,
};
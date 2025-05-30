const express = require('express');
const router = express.Router();
const { v2: cloudinary } = require('cloudinary');
const upload = require('../middleware/upload'); //  Your memoryStorage config
const { protect } = require('../middleware/authMiddleware');
const {createAuction, getAllAuctions, deleteAuction, getAuctionById, placeBid, getAuctionsByUserId } = require('../controllers/auctionController');

//  Cloudinary config 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/', getAllAuctions);
//  Your route to handle uploads
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    // Upload the file to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      async(error, result) => {
        if (error) {
          console.error('Cloudinary Error:', error);
          return res.status(500).json({ error: 'Cloudinary upload failed' });
        }

        req.file.path = result.secure_url;

        //  Now call auction controller
        await createAuction(req, res);
        }
    );

    uploadStream.end(fileBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', getAuctionById);
router.post('/:id/bid', protect, placeBid);

// Add a new route to fetch auctions by userId
router.get('/user/:userId', getAuctionsByUserId);
// DELETE /api/auctions/:id

router.delete('/:id', protect, deleteAuction);


module.exports = router;

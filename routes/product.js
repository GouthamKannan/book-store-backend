
const router = require('express').Router();
const ProductController = require('../controller/product');


// API End point for getting history of booking for the given user
router.post("/get_history", async (req, res) => {
    const {user_name} = req.body;
    try{
        // Get the booking history
        const response = await ProductController.get_history(user_name)
        return res.status(200).json({
          success: true,
          data: response,
        });
    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in adding task :: ${error.message}`,
      });
    }
  });


// API End point to get product details from the database
router.get("/get_products", async (req, res) => {
    try {
      // Get the product details
      var data = await ProductController.get_products();
      return res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in retriving the data :: ${error.message}`,
      });
    }
  });

// API Endpoint to place an order in the database
router.post("/place_order", async (req, res) => {
    const { user_name, cart } = req.body;
    try {
      // Place the order
      await ProductController.place_order(user_name, cart);

      return res.status(200).json({
        success: true,
        data: "Task updated successfully",
      })
    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in updating the task :: ${error.message}`,
      });
    }
  });

module.exports = router;
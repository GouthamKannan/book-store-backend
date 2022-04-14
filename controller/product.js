const { client: mongoClient } = require("../model/mongodb");

// Connect to MongoDB database
const dbConnection = mongoClient.db("book_store_application");

// Initialize the collections for the database
const productCollection = dbConnection.collection("product_details");
const orderCollection = dbConnection.collection("order_details");

/**
 * Add a new order details in the database
 * @param {string} user_name : Name of the user
 * @param {object} cart : Cart details
 * @returns ID of the inserted document
 */
const place_order = async (user_name, cart) => {
  const response = await orderCollection.insertOne({
    user_name,
    cart,
    date : new Date()
  });
  return response;
}

/**
 * Get booking history for the given user
 * @param {string} user_name : User name
 * @returns The booking history
 */
const get_history = async (user_name) => {
  const response = await orderCollection.find({user_name : user_name}).toArray();
  return response;
}

/**
 * Get the product details from the database
 * @returns Product details
 */
const get_products = async () => {
  const response = await productCollection.find().toArray();
  return response;
}

// Export functions
module.exports = {
  place_order,
  get_history,
  get_products
}
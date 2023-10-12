const mongoose = require('mongoose');
const {Schema} = mongoose;
  /*
  Define the schema of the cart collection.  
  */

const cartSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true
    },
    price: {
      type: Number,
      ref: "Products",
      required: true
  }
  }, { timestamps: true }
)

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
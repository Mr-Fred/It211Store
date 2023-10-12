const mongoose = require('mongoose');
const {Schema} = mongoose;

/*
Define the schema of the cart collection.  
*/

const orderSchema = new mongoose.Schema(
  {
    item_ids: {
      type: [Schema.Types.ObjectId],
      ref: "Products",
      required: true
    },
    ordered_items: {
      type: [String],
      ref: "Products",
      required: true
    },
    order_amount: {
      type: Number,
      ref: "Products",
      required: true
    }
  }, { timestamps: true }
)

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
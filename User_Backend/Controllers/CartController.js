const Cart = require("../Models/Cart");

const addToCart = async (req, res) => {
  try {
    const { itemName, itemPrice, itemImage } = req.body;
    const userId = req.user.userId;

    if (!itemName || !itemPrice) {
      return res
        .status(400)
        .json({ message: "Item name and price are required." });
    }

    const cartItem = new Cart({
      itemName,
      itemPrice,
      itemImage,
      user: userId,
    });

    await cartItem.save();

    res
      .status(201)
      .json({ message: "Item added to cart successfully", cartItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding item to cart", error: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cartItems = await Cart.find({ user: userId });

    res
      .status(200)
      .json({ message: "Cart items fetched successfully", cartItems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart items", error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;

    const deletedItem = await Cart.findByIdAndDelete(cartItemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res
      .status(200)
      .json({ message: "Cart item deleted successfully", deletedItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cart item", error: error.message });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  deleteCartItem,
};

const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");
const products = require("../data/products");

const router = express.Router();

// Helper Function to get a cart by user Id or guest ID

const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or a logged in user
// @access Public

router.post("/", async (req, res) => {
  const { productId, image, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);

    if (!product) res.status(400).json({ message: "Product Not Found" });

    // Determine if the user is logged in or Guest
    let cart = await getCart(userId, guestId);

    // if the cart exists, update it

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // Product already exists, Update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add new Product
        cart.products.push({
          productId,
          name: product.name,
          image,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      res.status(200).json(cart);
    } else {
      // Create new Cart for guest or User
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/cart
// @desc  Update product quantity in the cart for the guest or the logged in user
// @access PUBLIC

router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      let updatedProducts = [...cart.products];

      if (quantity > 0) {
        updatedProducts[productIndex].quantity = quantity;
      } else {
        updatedProducts.splice(productIndex, 1); // remove product
      }

      const updatedTotal = updatedProducts.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const updatedCart = await Cart.findByIdAndUpdate(
        cart._id,
        {
          products: updatedProducts,
          totalPrice: updatedTotal,
        },
        { new: true } // return updated cart
      );

      return res.status(200).json(updatedCart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }
});

// router.put("/", async (req, res) => {
//   const { productId, quantity, size, color, guestId, userId } = req.body;
//   try {
//     let cart = await getCart(userId, guestId);
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const productIndex = cart.products.findIndex(
//       (p) =>
//         p.productId.toString() === productId &&
//         p.size === size &&
//         p.color === color
//     );

//     if (productIndex > -1) {
//       // UPDATE Quantity
//       if (quantity > 0) {
//         cart.products[productIndex].quantity = quantity;
//       } else {
//         cart.products.splice(productIndex, 1); // Remove the product if the quantity is zero
//       }

//       cart.totalPrice = cart.products.reduce(
//         (acc, item) => acc + item.price * item.quantity,
//         0
//       );
//       await cart.save();
//       return res.status(200).json(cart);
//     } else {
//       return res.status(404).json({ message: "Product not founs in cart" });
//     }
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// @route Delete /api/cart
// @desc Delete the Product from the cart for user or guest
// @access PUBLIC

router.delete("/", async (req, res) => {
  try {
    const { productId, quantity, size, color, userId, guestId } = req.body;

    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(400).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/cart
// @desc Get logged-in users or guest user's Cart
// @access PUBLIC

router.get("/", async (req, res) => {
  const { userId, guestId } = req.body;

  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user Cart at login
// @access Private

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    //Find the guest cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is Empty" });
      }

      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            // If the item exists update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // Add item to the user cart
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();

        // Remove the user cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart :", error);
        }
        res.status(200).json(userCart);
      } else {
        // if user has no existing cart. assign the guest cart to user cart
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        // Guest cart has already merged return the user cart
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest cart Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;

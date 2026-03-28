const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

/// GET MY FAVOURITES
router.get("/", auth, (req, res) => {
  db.query(
    `SELECT properties.* FROM favourites
     JOIN properties ON favourites.property_id = properties.id
     WHERE favourites.user_id = ?`,
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    },
  );
});

/// ADD TO FAVOURITES
router.post("/:propertyId", auth, (req, res) => {
  const { propertyId } = req.params;

  // Check if this property is already in favourites for this user
  db.query(
    "SELECT * FROM favourites WHERE user_id = ? AND property_id = ?",
    [req.user.id, propertyId],
    (err, existing) => {
      if (err) return res.status(500).json(err);

      if (existing.length > 0) {
        return res.status(400).json({ message: "Already in favourites" });
      }

      // Add to favourites if not already present
      db.query(
        "INSERT INTO favourites (user_id, property_id) VALUES (?, ?)",
        [req.user.id, propertyId],
        (err) => {
          if (err) return res.status(500).json(err);
          res.json({ message: "Added to favourites" });
        },
      );
    },
  );
});

/// REMOVE FROM FAVOURITES
router.delete("/:propertyId", auth, (req, res) => {
  const { propertyId } = req.params;

  db.query(
    "DELETE FROM favourites WHERE user_id = ? AND property_id = ?",
    [req.user.id, propertyId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Removed" });
    },
  );
});

module.exports = router;

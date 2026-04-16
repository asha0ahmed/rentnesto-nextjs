const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET /api/search-suggestions?q=dha
router.get('/', async (req, res) => {
  try {
    const query = req.query.q || '';

    if (!query || query.trim().length < 1) {
      return res.json({ success: true, data: [] });
    }

    const regex = new RegExp(query.trim(), 'i');

    const properties = await Property.find({
      isAvailable: true,
      $or: [
        { 'location.area': regex },
        { 'location.district': regex },
        { 'location.division': regex },
      ]
    }).select('location.area location.district location.division').limit(50);

    // Collect all matching location strings
    const seen = new Set();
    const suggestions = [];

    for (const p of properties) {
      const candidates = [
        p.location?.area,
        p.location?.district,
        p.location?.division,
      ];

      for (const val of candidates) {
        if (val && regex.test(val) && !seen.has(val.toLowerCase())) {
          seen.add(val.toLowerCase());
          suggestions.push(val);
          if (suggestions.length >= 8) break;
        }
      }

      if (suggestions.length >= 8) break;
    }

    res.json({ success: true, data: suggestions });

  } catch (error) {
    console.error('Search suggestions error:', error);
    res.status(500).json({ success: false, data: [] });
  }
});

module.exports = router;
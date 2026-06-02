const products = [
  // ── MEN (8) ──
  {
    id: 1, name: "Oversized Graphic Hoodie", category: "Men", subCategory: "Tops",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80"
    ],
    price: 3499, originalPrice: 4999, rating: 4.5, badge: "Sale",
    description: "Premium cotton blend oversized hoodie with bold graphic print. Features a relaxed fit with ribbed cuffs and hem, kangaroo pocket, and soft fleece lining for ultimate comfort. Perfect for casual outings and streetwear styling.",
    reviews: [
      { id: 1, name: "Arjun Kumar", rating: 5, comment: "Amazing quality! The fabric is so soft and the fit is perfect. Highly recommend!", date: "2024-01-15", verified: true },
      { id: 2, name: "Priya Singh", rating: 4, comment: "Great hoodie, love the design. Only wish it came in more colors.", date: "2024-01-10", verified: true },
      { id: 3, name: "Rohit Sharma", rating: 5, comment: "Best purchase ever! Super comfortable and stylish.", date: "2024-01-08", verified: false }
    ]
  },
  {
    id: 2, name: "Slim Fit Chino Trousers", category: "Men", subCategory: "Bottoms",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      "https://images.unsplash.com/photo-1519238263670-826a4ad46896?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80"
    ],
    price: 2799, originalPrice: 3499, rating: 4.3, badge: "Sale",
    description: "Tailored slim-fit chinos in stretch cotton for all-day comfort. Features a modern tapered cut, flat front design, and versatile styling options. Machine washable and wrinkle-resistant for easy care.",
  },
  {
    id: 3, name: "Linen Relaxed Blazer", category: "Men", subCategory: "Outerwear",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1505704215752-bf319315069d?w=600&q=80",
      "https://images.unsplash.com/photo-1552062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80"
    ],
    price: 6999, originalPrice: 8999, rating: 4.6, badge: "New",
    description: "Breathable linen blazer with a relaxed silhouette for modern men. Unstructured design with natural drape, notch lapels, and two-button closure. Perfect for smart-casual occasions and warm weather styling.",
  },
  {
    id: 4, name: "Classic White Oxford Shirt", category: "Men", subCategory: "Tops",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc7cb4c2b?w=600&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80",
      "https://images.unsplash.com/photo-1609906655976-934d0277868f?w=600&q=80"
    ],
    price: 1999, originalPrice: 2499, rating: 4.4, badge: null,
    description: "Crisp white Oxford shirt crafted from 100% Egyptian cotton.",
  },
  {
    id: 5, name: "Streetwear Bomber Jacket", category: "Men", subCategory: "Outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80",
      "https://images.unsplash.com/photo-1592225235118-6b4ee5f632e8?w=600&q=80"
    ],
    price: 5499, originalPrice: 6999, rating: 4.7, badge: "Trending",
    description: "Urban bomber jacket with premium satin lining and ribbed cuffs.",
  },
  {
    id: 6, name: "Raw Denim Straight Jeans", category: "Men", subCategory: "Bottoms",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
      "https://images.unsplash.com/photo-1519238263670-826a4ad46896?w=600&q=80",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&q=80"
    ],
    price: 3299, originalPrice: 4299, rating: 4.5, badge: null,
    description: "Japanese raw selvedge denim with a classic straight cut.",
  },
  {
    id: 7, name: "Merino Wool Crewneck", category: "Men", subCategory: "Tops",
    image: "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=600&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80"
    ],
    price: 4299, originalPrice: 5499, rating: 4.6, badge: "New",
    description: "Ultra-soft merino wool crewneck sweater in a relaxed fit.",
  },
  {
    id: 8, name: "Cargo Utility Pants", category: "Men", subCategory: "Bottoms",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
      "https://images.unsplash.com/photo-1519238263670-826a4ad46896?w=600&q=80"
    ],
    price: 3799, originalPrice: 4799, rating: 4.4, badge: null,
    description: "Multi-pocket cargo pants in durable ripstop fabric.",
  },

  // ── WOMEN (8) ──
  {
    id: 9, name: "Floral Wrap Midi Dress", category: "Women", subCategory: "Dresses",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80"
    ],
    price: 3999, originalPrice: 5499, rating: 4.8, badge: "Bestseller",
    description: "Elegant floral wrap dress in lightweight chiffon, perfect for any occasion. Features a flattering V-neckline, adjustable tie waist, and flowing midi length. The delicate floral print adds feminine charm to your wardrobe.",
    reviews: [
      { id: 1, name: "Kavya Nair", rating: 5, comment: "Absolutely gorgeous dress! The fabric is beautiful and the fit is so flattering.", date: "2024-01-20", verified: true },
      { id: 2, name: "Sneha Patel", rating: 5, comment: "Perfect for summer events. Got so many compliments!", date: "2024-01-18", verified: true },
      { id: 3, name: "Anita Desai", rating: 4, comment: "Love the print and quality. Runs slightly large.", date: "2024-01-15", verified: true }
    ]
  },
  {
    id: 10, name: "High-Waist Wide Leg Pants", category: "Women", subCategory: "Bottoms",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      "https://images.unsplash.com/photo-1519238263670-826a4ad46896?w=600&q=80"
    ],
    price: 2999, originalPrice: 3999, rating: 4.6, badge: "New",
    description: "Sophisticated wide-leg trousers with a flattering high waist. Crafted from premium crepe fabric with a fluid drape and comfortable fit. Features side pockets and a concealed zip closure for a polished look.",
  },
  {
    id: 11, name: "Cropped Knit Cardigan", category: "Women", subCategory: "Tops",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80"
    ],
    price: 2499, originalPrice: 3299, rating: 4.4, badge: null,
    description: "Soft ribbed knit cardigan with a cropped silhouette and button closure.",
  },
  {
    id: 12, name: "Satin Slip Maxi Dress", category: "Women", subCategory: "Dresses",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80"
    ],
    price: 4999, originalPrice: 6499, rating: 4.9, badge: "Luxury",
    description: "Luxurious satin slip dress with adjustable straps and a fluid drape.",
  },
  {
    id: 13, name: "Oversized Denim Jacket", category: "Women", subCategory: "Outerwear",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80"
    ],
    price: 4299, originalPrice: 5499, rating: 4.5, badge: "Trending",
    description: "Classic oversized denim jacket with distressed detailing.",
  },
  {
    id: 14, name: "Pleated Mini Skirt", category: "Women", subCategory: "Bottoms",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
      "https://images.unsplash.com/photo-1506629082632-b278b09a78b8?w=600&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80"
    ],
    price: 1999, originalPrice: 2799, rating: 4.3, badge: "Sale",
    description: "Playful pleated mini skirt in premium polyester blend.",
  },
  {
    id: 15, name: "Lace Trim Cami Top", category: "Women", subCategory: "Tops",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80"
    ],
    price: 1799, originalPrice: 2299, rating: 4.4, badge: "New",
    description: "Delicate lace-trim camisole in soft modal fabric.",
  },
  {
    id: 16, name: "Trench Coat Classic", category: "Women", subCategory: "Outerwear",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1505704215752-bf319315069d?w=600&q=80",
      "https://images.unsplash.com/photo-1552062407-98eeb64c6a62?w=600&q=80"
    ],
    price: 8999, originalPrice: 11999, rating: 4.8, badge: "Premium",
    description: "Timeless double-breasted trench coat in water-resistant cotton gabardine.",
  },

  // ── SNEAKERS (8) ──
  {
    id: 17, name: "Air Cushion Runner Pro", category: "Sneakers", subCategory: "Running",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80"
    ],
    price: 8999, originalPrice: 10999, rating: 4.8, badge: "Bestseller",
    description: "High-performance running sneakers with advanced air cushion technology. Features breathable mesh upper, responsive midsole foam, and durable rubber outsole with superior grip. Designed for comfort during long runs and daily training.",
    reviews: [
      { id: 1, name: "Vikram Singh", rating: 5, comment: "Best running shoes I've ever owned! Great cushioning and support.", date: "2024-01-22", verified: true },
      { id: 2, name: "Rahul Gupta", rating: 5, comment: "Perfect for daily runs. Very comfortable and durable.", date: "2024-01-19", verified: true },
      { id: 3, name: "Amit Sharma", rating: 4, comment: "Good quality shoes, worth the price. Recommend for serious runners.", date: "2024-01-16", verified: false }
    ]
  },
  {
    id: 18, name: "Classic Low-Top Canvas", category: "Sneakers", subCategory: "Casual",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80"
    ],
    price: 3499, originalPrice: 4499, rating: 4.5, badge: null,
    description: "Timeless canvas low-top sneakers with vulcanized rubber sole.",
  },
  {
    id: 19, name: "Chunky Platform Sneakers", category: "Sneakers", subCategory: "Fashion",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80"
    ],
    price: 6499, originalPrice: 7999, rating: 4.6, badge: "New",
    description: "Bold chunky platform sneakers with premium leather upper.",
  },
  {
    id: 20, name: "Slip-On Knit Sneakers", category: "Sneakers", subCategory: "Casual",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80"
    ],
    price: 4299, originalPrice: 5499, rating: 4.4, badge: null,
    description: "Lightweight knit slip-on sneakers with memory foam insole.",
  },
  {
    id: 21, name: "Retro High-Top Leather", category: "Sneakers", subCategory: "Fashion",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80"
    ],
    price: 7499, originalPrice: 9499, rating: 4.7, badge: "Trending",
    description: "Retro-inspired high-top sneakers in full-grain leather.",
  },
  {
    id: 22, name: "Trail Running Shoes", category: "Sneakers", subCategory: "Running",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80"
    ],
    price: 9499, originalPrice: 11999, rating: 4.8, badge: "New",
    description: "Aggressive-grip trail shoes with waterproof membrane.",
  },
  {
    id: 23, name: "Minimalist White Sneakers", category: "Sneakers", subCategory: "Casual",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80"
    ],
    price: 5499, originalPrice: 6999, rating: 4.6, badge: null,
    description: "Clean minimalist leather sneakers — the perfect everyday shoe.",
  },
  {
    id: 24, name: "Neon Sport Runners", category: "Sneakers", subCategory: "Running",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80"
    ],
    price: 6999, originalPrice: 8499, rating: 4.5, badge: "Sale",
    description: "Vibrant neon sport runners with responsive foam midsole.",
  },

  // ── ACCESSORIES (8) ──
  {
    id: 25, name: "Structured Leather Tote", category: "Accessories", subCategory: "Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
      "https://images.unsplash.com/photo-1554941525-cdeb84f4f00b?w=600&q=80"
    ],
    price: 9999, originalPrice: 12999, rating: 4.7, badge: "Premium",
    description: "Handcrafted full-grain leather tote with gold-tone hardware.",
  },
  {
    id: 26, name: "Silk Square Scarf", category: "Accessories", subCategory: "Scarves",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80"
    ],
    price: 2499, originalPrice: 3299, rating: 4.5, badge: null,
    description: "100% pure silk square scarf with hand-rolled edges and vibrant print.",
  },
  {
    id: 27, name: "Aviator Sunglasses", category: "Accessories", subCategory: "Eyewear",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1559563362-66a1b33f1aa6?w=600&q=80"
    ],
    price: 3999, originalPrice: 4999, rating: 4.6, badge: "Trending",
    description: "Classic aviator sunglasses with UV400 polarized lenses.",
  },
  {
    id: 28, name: "Woven Straw Hat", category: "Accessories", subCategory: "Hats",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80"
    ],
    price: 1799, originalPrice: 2299, rating: 4.3, badge: null,
    description: "Handwoven natural straw hat with a wide brim and ribbon trim.",
  },
  {
    id: 29, name: "Leather Belt Tan", category: "Accessories", subCategory: "Belts",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80"
    ],
    price: 1999, originalPrice: 2799, rating: 4.4, badge: "New",
    description: "Full-grain tan leather belt with brushed silver buckle.",
  },
  {
    id: 30, name: "Canvas Backpack", category: "Accessories", subCategory: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=600&q=80",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80"
    ],
    price: 4499, originalPrice: 5999, rating: 4.5, badge: null,
    description: "Durable waxed canvas backpack with leather trim and laptop sleeve.",
  },
  {
    id: 31, name: "Beanie Wool Cap", category: "Accessories", subCategory: "Hats",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80"
    ],
    price: 1299, originalPrice: 1799, rating: 4.3, badge: "Sale",
    description: "Cosy ribbed wool beanie in a classic fit.",
  },
  {
    id: 32, name: "Tortoise Cat-Eye Glasses", category: "Accessories", subCategory: "Eyewear",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
    ],
    price: 3499, originalPrice: 4499, rating: 4.6, badge: "Trending",
    description: "Retro tortoise-shell cat-eye frames with anti-glare lenses.",
  },

  // ── LUXURY (8) ──
  {
    id: 33, name: "Swiss Automatic Watch", category: "Luxury", subCategory: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
      "https://images.unsplash.com/photo-1548068799-1f2d2d9c6d0c?w=600&q=80",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&q=80",
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=600&q=80"
    ],
    price: 49999, originalPrice: 59999, rating: 4.9, badge: "Luxury",
    description: "Swiss-made automatic movement with sapphire crystal and leather strap. Features a 42mm stainless steel case, exhibition caseback, and 48-hour power reserve. Water resistant to 100 meters with luminous hands and markers for exceptional readability.",
    reviews: [
      { id: 1, name: "Rajesh Khanna", rating: 5, comment: "Exceptional quality and craftsmanship. Worth every penny!", date: "2024-01-25", verified: true },
      { id: 2, name: "Suresh Kumar", rating: 5, comment: "Beautiful watch with amazing attention to detail. Highly recommended!", date: "2024-01-23", verified: true },
      { id: 3, name: "Deepak Mehta", rating: 5, comment: "Premium quality watch. The automatic movement is smooth and precise.", date: "2024-01-20", verified: true }
    ]
  },
  {
    id: 34, name: "Cashmere Overcoat", category: "Luxury", subCategory: "Outerwear",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1505704215752-bf319315069d?w=600&q=80",
      "https://images.unsplash.com/photo-1552062407-98eeb64c6a62?w=600&q=80"
    ],
    price: 29999, originalPrice: 39999, rating: 4.8, badge: "Luxury",
    description: "Pure cashmere overcoat with a tailored silhouette and satin lining.",
  },
  {
    id: 35, name: "Gold Chain Necklace", category: "Luxury", subCategory: "Jewellery",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80"
    ],
    price: 14999, originalPrice: 18999, rating: 4.7, badge: "Premium",
    description: "18K gold-plated chain necklace with lobster clasp closure.",
  },
  {
    id: 36, name: "Quilted Crossbody Bag", category: "Luxury", subCategory: "Bags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
      "https://images.unsplash.com/photo-1554941525-cdeb84f4f00b?w=600&q=80"
    ],
    price: 19999, originalPrice: 24999, rating: 4.9, badge: "Luxury",
    description: "Iconic quilted lambskin crossbody with gold chain strap.",
  },
  {
    id: 37, name: "Diamond Stud Earrings", category: "Luxury", subCategory: "Jewellery",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80"
    ],
    price: 24999, originalPrice: 32999, rating: 4.9, badge: "Luxury",
    description: "0.5ct lab-grown diamond studs set in 18K white gold.",
  },
  {
    id: 38, name: "Silk Evening Gown", category: "Luxury", subCategory: "Dresses",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80"
    ],
    price: 34999, originalPrice: 44999, rating: 4.8, badge: "Luxury",
    description: "Floor-length pure silk evening gown with hand-sewn embellishments.",
  },
  {
    id: 39, name: "Crocodile Embossed Wallet", category: "Luxury", subCategory: "Bags",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80"
    ],
    price: 8999, originalPrice: 11999, rating: 4.7, badge: "Premium",
    description: "Slim bifold wallet in crocodile-embossed Italian leather.",
  },
  {
    id: 40, name: "Rose Gold Bracelet", category: "Luxury", subCategory: "Jewellery",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80"
    ],
    price: 12999, originalPrice: 16999, rating: 4.8, badge: "New",
    description: "Delicate rose gold chain bracelet with pavé diamond clasp.",
  },

  // ── TRENDING / BESTSELLERS (extra) ──
  {
    id: 49, name: "Printed Resort Shirt", category: "Men", subCategory: "Tops",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    price: 2199, originalPrice: 2999, rating: 4.5, badge: "Trending",
    description: "Relaxed-fit resort shirt with an all-over tropical print in lightweight viscose.",
  },
  {
    id: 50, name: "Tailored Suit Trousers", category: "Men", subCategory: "Bottoms",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    price: 4499, originalPrice: 5999, rating: 4.6, badge: "Bestseller",
    description: "Slim-cut suit trousers in a wool-blend fabric with a flat-front design.",
  },
  {
    id: 51, name: "Wrap Blouse Ivory", category: "Women", subCategory: "Tops",
    image: "https://images.unsplash.com/photo-1485518882345-15568b007407?w=600&q=80",
    price: 2299, originalPrice: 3099, rating: 4.5, badge: "Bestseller",
    description: "Flowing ivory wrap blouse in soft satin with a V-neckline and flutter sleeves.",
  },
  {
    id: 52, name: "High-Rise Skinny Jeans", category: "Women", subCategory: "Bottoms",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    price: 3299, originalPrice: 4499, rating: 4.6, badge: "Trending",
    description: "Classic high-rise skinny jeans in premium stretch denim with a sculpting fit.",
  },
  {
    id: 53, name: "Leather Crossbody Mini", category: "Accessories", subCategory: "Bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    price: 5999, originalPrice: 7999, rating: 4.7, badge: "Trending",
    description: "Compact genuine leather crossbody bag with adjustable chain strap and magnetic clasp.",
  },
  {
    id: 54, name: "Puffer Vest Quilted", category: "Men", subCategory: "Outerwear",
    image: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=600&q=80",
    price: 3799, originalPrice: 4999, rating: 4.4, badge: "Bestseller",
    description: "Lightweight quilted puffer vest with a recycled fill and two zip pockets.",
  },
  {
    id: 55, name: "Flowy Maxi Skirt", category: "Women", subCategory: "Bottoms",
    image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&q=80",
    price: 2799, originalPrice: 3799, rating: 4.5, badge: "Trending",
    description: "Bohemian flowy maxi skirt in a tiered chiffon with elastic waist.",
  },
  {
    id: 56, name: "Running Shorts Pro", category: "Men", subCategory: "Activewear",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80",
    price: 1799, originalPrice: 2499, rating: 4.4, badge: "Bestseller",
    description: "Lightweight 2-in-1 running shorts with built-in liner and zip pocket.",
  },
  {
    id: 57, name: "Pearl Drop Earrings", category: "Luxury", subCategory: "Jewellery",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80",
    price: 9999, originalPrice: 12999, rating: 4.8, badge: "Bestseller",
    description: "Freshwater pearl drop earrings set in 14K gold-filled hooks.",
  },
  {
    id: 58, name: "Chunky Knit Sweater", category: "Women", subCategory: "Tops",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    price: 3499, originalPrice: 4599, rating: 4.6, badge: "Trending",
    description: "Oversized chunky-knit sweater in a soft wool-acrylic blend with drop shoulders.",
  },
  {
    id: 59, name: "Formal Oxford Shoes", category: "Sneakers", subCategory: "Formal",
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80",
    price: 7999, originalPrice: 9999, rating: 4.7, badge: "Bestseller",
    description: "Classic full-brogue Oxford shoes in burnished tan leather with leather sole.",
  },
  {
    id: 60, name: "Silk Pocket Square", category: "Accessories", subCategory: "Scarves",
    image: "https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=600&q=80",
    price: 999, originalPrice: 1499, rating: 4.3, badge: "Bestseller",
    description: "Pure silk pocket square with hand-rolled edges and a classic geometric print.",
  },

  // ── NEW ARRIVALS — mixed categories (8) ──
  {
    id: 41, name: "Tie-Dye Oversized Tee", category: "Men", subCategory: "Tops",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    price: 1599, originalPrice: 2199, rating: 4.3, badge: "New",
    description: "Hand-dyed tie-dye oversized tee in 100% organic cotton.",
  },
  {
    id: 42, name: "Ribbed Bodycon Dress", category: "Women", subCategory: "Dresses",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    price: 2799, originalPrice: 3599, rating: 4.5, badge: "New",
    description: "Figure-hugging ribbed bodycon dress in stretch viscose.",
  },
  {
    id: 43, name: "Suede Chelsea Boots", category: "Sneakers", subCategory: "Boots",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80",
    price: 8499, originalPrice: 10999, rating: 4.7, badge: "New",
    description: "Premium suede Chelsea boots with elastic side panels.",
  },
  {
    id: 44, name: "Bucket Hat Denim", category: "Accessories", subCategory: "Hats",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80",
    price: 1499, originalPrice: 1999, rating: 4.2, badge: "New",
    description: "Washed denim bucket hat with embroidered logo detail.",
  },
  {
    id: 45, name: "Velvet Blazer Midnight", category: "Luxury", subCategory: "Outerwear",
    image: "https://images.unsplash.com/photo-1594938374182-a57369b8c196?w=600&q=80",
    price: 18999, originalPrice: 24999, rating: 4.8, badge: "New",
    description: "Midnight blue velvet blazer with peak lapels and satin lining.",
  },
  {
    id: 46, name: "Linen Co-ord Set", category: "Men", subCategory: "Sets",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    price: 5999, originalPrice: 7999, rating: 4.6, badge: "New",
    description: "Matching linen shirt and trouser co-ord set in natural ecru.",
  },
  {
    id: 47, name: "Flare Yoga Pants", category: "Women", subCategory: "Activewear",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    price: 2299, originalPrice: 2999, rating: 4.5, badge: "New",
    description: "High-waist flare yoga pants in buttery-soft 4-way stretch fabric.",
  },
  {
    id: 48, name: "Leather Card Holder", category: "Accessories", subCategory: "Bags",
    image: "https://images.unsplash.com/photo-1606503153255-59d5e417b6f4?w=600&q=80",
    price: 1299, originalPrice: 1799, rating: 4.4, badge: "New",
    description: "Slim genuine leather card holder with 6 card slots.",
  },
];

export default products;

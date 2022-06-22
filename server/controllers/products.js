import mongoose from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";


export const getProducts = async (req, res) => {
  try {
  
    const products = await Product.find().populate('category').sort({'createdAt': -1})
    res.status(200).json(products);
  } catch ({ message }) {
    res.status(401).json({ message });
  }
};
// export const getProductsBySortingPriceAsc = async (req, res) => {
//   const { page } = req.query;

//   try {
//     const LIMIT = 8;
//     const startIndex = (Number(page) - 1) * LIMIT;
//     const total = await Product.find().sort({price: 1}).countDocuments({});

//     const products = await Product.find().populate('category').limit(LIMIT).skip(startIndex).sort({price: 1})

//     res.status(200).json({products,currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
//   } catch ({ message }) {
//     res.status(401).json({ message });
//   }
// };
// export const getProductsBySortingPriceDesc = async (req, res) => {
//   try {
  
//     const products = await Product.find().populate('category').sort({price: -1})
//     res.status(200).json(products);
//   } catch ({ message }) {
//     res.status(401).json({ message });
//   }
// };
// export const getProductsBySortingLike = async (req, res) => {
//   try {
  
//     const products = await Product.find().populate('category').sort({likes: -1})
//     res.status(200).json(products);
//   } catch ({ message }) {
//     res.status(401).json({ message });
//   }
// };
export const getProductsByLike = async (req, res) => {
  try {
  
    const products=await Product.aggregate( [
      { "$project": {
            "title":1,
           
            "image":1,
            
            "likes":1,
            "length": { "$size": "$likes" }
        }},
       { "$sort": { "length": -1 } }  ],
       {"$limit":10},
  function(err,results) {
      // results in here
  });
    res.status(200).json(products);
  } catch ({ message }) {
    res.status(401).json({ message });
  }
};
export const getProductById=async (req, res) => {
  const {id} =req.params;

  try{
  const product=await Product.findById(id).populate("creator").populate('category').sort({_id: -1})

  res.status(200).json(product)
  }
  catch({message}) {
    res.status(401).json({ message });
  }

}
export const getProductsByCategory=async (req, res) => {
  const {id} =req.params;
  const { page,price,likes } = req.query;
  try{
    let products
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; 
    
    const total = await Product.find({category:id}).countDocuments({});
    // get the starting index of every page
    if(price ){

      products=await Product.find({category:id}).populate('category').sort({price}).limit(LIMIT).skip(startIndex);

    }
    if(likes==="likes" ){
      products=await Product.aggregate( [

       
        { "$match" : { "category" : new mongoose.Types.ObjectId(id) } },
        {"$project": {
          "length": { "$size": "$likes" },
              "title":1,
              "description":1,
              "city":1,
              "image":1,
              "price":1,
              "delegation":1,
              "createdAT":1,
              "stock":1,
              "phone":1,
              "rating":1,
              "category":1,
              "subCategory":1,
              "subCategory2":1,
              "creator":1,
              "likes":1
          }},
         { "$sort": { "length": -1 } },
         {"$limit":LIMIT},
         {"$skip":startIndex}
    
      ],
         function(err,results) {
             // results in here
         })
        }
    if(!price && !likes){
   products=await Product.find({category:id}).populate('category').sort({_id: -1}).limit(LIMIT).skip(startIndex);
    }
  res.status(200).json({products,currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
  }
  catch({message}) {
    res.status(401).json({ message });
  }

}
export const getProductsByUser=async (req, res) => {
  const {id} =req.params;
  const { page,price,likes  } = req.query;
  const LIMIT = 8;
  const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
  const total = await Product.find({creator:id}).countDocuments({});
  try{
    
    let products
    

    if(price==="asc" ||price==="desc" ){
      products=await Product.find({creator:id}).limit(LIMIT).skip(startIndex).sort({price});

    }
    if(likes==="likes" ){
      products=await Product.aggregate( [
        { "$match" : { "creator" : new mongoose.Types.ObjectId(id) } },

{"$project": {
      "title":1,
      "description":1,
      "city":1,
      "image":1,
      "price":1,
      "delegation":1,
      "createdAT":1,
      "stock":1,
      "phone":1,
      "rating":1,
      "category":1,
      "subCategory":1,
      "subCategory2":1,
      "creator":1,
      "likes":1,
      "length": { "$size": "$likes" }
  }},
       
         { "$sort": { "length": -1 } },
         {"$limit":LIMIT},
         {"$skip":startIndex}
    ],
    function(err,results) {
        // results in here
    });

    }
    if(!price && !likes){
   products=await Product.find({creator:id}).populate('category').sort({_id: -1}).limit(LIMIT).skip(startIndex);
    }
  res.status(200).json({products,currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
}
  catch({message}) {
    res.status(401).json({ message });
  }

}
export const getProductsBySearch = async (req, res) => {
  const { product,page,price,likes } = req.query;
  const LIMIT = 8;
  const title = new RegExp(product, "i");

  let products;
  const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
  const total = await  Product.find({
    'title': { $in: title }
}).countDocuments({});

  try {
    if(price ){
      products= await Product.find({
        'title': { $in: title }
    }).sort({price}).limit(LIMIT).skip(startIndex);

    }
    if(likes==="likes" ){
     products= await Product.aggregate( [

       
        { "$match" : {  'title' : {$in : title} } },
        {"$project": {
              "title":1,
              "description":1,
              "city":1,
              "image":1,
              "price":1,
              "delegation":1,
              "createdAT":1,
              "stock":1,
              "phone":1,
              "rating":1,
              "category":1,
              "subCategory":1,
              "subCategory2":1,
              "creator":1,
              "likes":1,
              "length": { "$size": "$likes" }
          }},
         { "$sort": { "length": -1 } },
         {"$limit":LIMIT},
         {"$skip":startIndex}
    
      ],
         function(err,results) {
             // results in here
         })
    //   products=await Product.find({
    //     'title': { $in: title }
    // }).populate('category').limit(LIMIT).skip(startIndex).sort({likes: -1});

    }
    if(!price && !likes){
   products=await Product.find({
    'title': { $in: title }
}).populate('category').limit(LIMIT).skip(startIndex).sort({_id: -1});
    }
    // const products = await Product.find({title})
    res.status(200).json({products,currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
  } catch (err) {
    res.status(404).json(err);
  }
};

export const getProductsBySubCategory = async (req, res) => {
  const { subCategory, subCategory2,page,price,likes } = req.query;
console.log("price",price)

  try {
    
    const subCat = new RegExp(subCategory, "i");
    const subCat2 = new RegExp(subCategory2, "i");
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    let total ;

if(subCategory && subCategory2){
  let products
  total=await Product.find({
    $and: [{ subCategory:subCat }, { subCategory2: subCat2 }]
  }).countDocuments({})
  if(price ){

    products=await Product.find({
      $and: [{ subCategory:subCat }, { subCategory2: subCat2 }]
    }).sort({price}).limit(LIMIT).skip(startIndex);

  }
  if( likes === "likes" ){
    products=await Product.aggregate( [
      { 
        "$match": {
             $and: [ 
                 {subCategory: subCat}, 
                 {subCategory2: subCat2}
             ]
        }
      },
      {"$project": {
        
            "title":1,
            "description":1,
            "city":1,
            "image":1,
            "price":1,
            "delegation":1,
            "createdAT":1,
            "stock":1,
            "phone":1,
            "rating":1,
            "category":1,
            "subCategory":1,
            "subCategory2":1,
            "creator":1,
            "likes":1,
            "length": { "$size": "$likes" }
        }},
       
       { "$sort": { "length": -1 } },
       {"$limit":LIMIT},
       {"$skip":startIndex}
  
    ],
       function(err,results) {
           // results in here
       })
    // products=await Product.find({
      
    //   $and: [{ subCategory:subCat }, { subCategory2: subCat2 }]
    // }).populate('category').limit(LIMIT).skip(startIndex).sort({likes: -1});

  }
  if(!price && !likes){
  
     products = await Product.find({
      $and: [{ subCategory:subCat }, { subCategory2: subCat2 }]
    }).sort({_id: -1}).limit(LIMIT).skip(startIndex);
  }
    res.status(200).json({products,currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
  }
  if(subCategory && !subCategory2){
    let products
    total=await Product.find({ subCategory:subCat 
    }).countDocuments({})
    if(price ){
      products=await Product.find({ subCategory:subCat 
      }).populate('category').sort({price}).limit(LIMIT).skip(startIndex);
  
    }
    if(likes ==="likes" ){
      products=await Product.aggregate( [
        { "$match" : { "subCategory" :subCat} },

        {"$project": {
          "title":1,
          "description":1,
          "city":1,
          "image":1,
          "price":1,
          "delegation":1,
          "createdAT":1,
          "stock":1,
          "phone":1,
          "rating":1,
          "category":1,
          "subCategory":1,
          "subCategory2":1,
          "creator":1,
          "likes":1,
          "length": { "$size": "$likes" }
      }},
       
         { "$sort": { "length": -1 } },
         {"$limit":LIMIT},
         {"$skip":startIndex}
    
      ],
         function(err,results) {
             // results in here
         })
      // products=await Product.find({ subCategory:subCat 
      // }).populate('category').limit(LIMIT).skip(startIndex).sort({likes: -1});
  
    }
    if(!price && !likes){
     products = await Product.find({ subCategory:subCat 
    }).sort({'createdAt': -1}).limit(LIMIT).skip(startIndex);
  }
  res.status(200).json({products,currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})

}
  } catch (err) {
    res.status(404).json(err);
  }
};

export const createProduct = async (req, res) => {
  const newProduct = new Product({
    ...req.body,
  });
  try {
    if (!await Category.findById(req.body.category))
    return res.status(404).send("not category available");
    const pr=await newProduct.save();
    res.status(200).json({message:'ok',newProduct:pr});
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("not id available");
  if (req?.userId != req.body?.creator) {
    return res.status(403).send({ message: "access denied" });
  }
   await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.json({message:'ok',productUpdated:req.body});
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
 
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("not id available");
    const product = await Product.findById(id);
    // console.log(req.userId)
    // console.log( product?.creator?.userId)

    if (req?.userId != product?.creator) {
      return res.status(403).send({ message: "access denied" });
    }
    const productDeleted = await Product.findByIdAndDelete(id);
    res.json(productDeleted);
  } catch (err) {
    console.log(err);
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const product = await Product.findById(id);

  const index = product.likes.findIndex((id) => id ===String(req.userId));

  if (index === -1) {
    product.likes.push(req.userId);
  } else {
    product.likes = product.likes.filter((id) => id !== String(req.userId));
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

  res.status(200).json(updatedProduct);
}

 // { "$project": {
        //     "title":1,
        //     "description":1,
        //     "city":1,
        //     "image":1,
        //     "price":1,
        //     "delegation":1,
        //     "createdAT":1,
        //     "stock":1,
        //     "phone":1,
        //     "rating":1,
        //     "category":1,
        //     "subCategory":1,
        //     "subCategory2":1,
        //     "creator":1,
        //     "likes":1,
        //     "length": { "$size": "$likes" }
        // }},
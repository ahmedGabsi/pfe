import Payment from "../models/Payment.js";

// export const payment = async (req, res) => {
//     const newPayment = new Payment({
//       ...req.body
//     });
//     try {
//       if (!await User.findById(req.body.User))
//       return res.status(404).send("not user available");
//       await newPayment.save();
//       res.status(200).json({message:'ok',newPayment});
//     } catch ({ message }) {
//       res.status(404).json({ message });
//     }
//   };
  
  export const getPayments = async (req, res) => {
    try {
  
      const payments = await Payment.find().sort({_id: -1})
      res.status(200).json(payments);
    } catch ({ message }) {
      res.status(401).json({ message });
    }
  };

  export const getPaymentByBuyer=async(req, res) => {
    const {id} =req.params;
    try{
    const orders=await Payment.find({buyer_id:id}).sort({_id: -1})
  
    res.status(200).json(orders)
    }
    catch({message}) {
      res.status(401).json({ message });
    }
  
  }

  export const getPaymentBySeller=async(req, res) => {
    const {id} =req.params;
    console.log(id)
    try{
    const orders=await Payment.find().sort({createdAt: -1})
    // const sales=[...orders.map(el=>el.orders).flat().filter(el=>el.seller.id===id).map(el=>({ ...el,buyer:orders.map(el=>({id:el.buyer_id,...el.buyer}))}))]
     console.log(orders.map(el=>el.orders).flat().filter(el=>el.seller.id===id))
    res.status(200).json(orders.map(el=>el.orders).flat().filter(el=>el.seller.id===id))
    }
    catch({message}) {
      res.status(401).json({ message });
    }
  
  }
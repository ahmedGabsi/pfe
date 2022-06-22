// import {buffer} from 'micro'
// import Stripe from 'stripe';

// const stripe =new Stripe("sk_test_51KOlwKCRTajskz10M1UwhmZuoN8wWtc1Iw0xLYLofIBqZhKrxv56za5NyR9AAVDWkCd33YOCQLhFfKpYDNkshyUS00K7o9Emun");
// const endpointSecret="whsec_e95f9ad5acaaf23a6d061ff0c9c7604bf7494f9bd40d15f3d0de7eea16d66ea3";
// const ordersOver=async(payload)=>{
 
//     console.log("payload :",payload.metadata)
      
//   }


//   export const webhook= async (request,response) => {
//     const event = request.body;
//     console.log("orders: ",JSON.stringify(event))
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object;
//         console.log(`PaymentIntent for ${JSON.stringify(paymentIntent)} was successful!`);
//         // Then define and call a method to handle the successful payment intent.
//         // handlePaymentIntentSucceeded(paymentIntent);
//         break;
//       case 'payment_method.attached':
//         const paymentMethod = event.data.object;
//         // Then define and call a method to handle the successful attachment of a PaymentMethod.
//         // handlePaymentMethodAttached(paymentMethod);
//         break;
//       default:
//         // Unexpected event type
//         console.log(`Unhandled event type ${event.type}.`);
//     }
//   }
  
//     // Return a 200 response to acknowledge receipt of the event
    



  
 




//     // let event = request.body;
//     // // Only verify the event if you have an endpoint secret defined.
//     // // Otherwise use the basic event deserialized with JSON.parse
//     // if (endpointSecret) {
//     //   // Get the signature sent by Stripe
//     //   const signature = request.headers['stripe-signature'];
//     //   try {
//     //     event = stripe.webhooks.constructEvent(
//     //       request.body,
//     //       signature,
//     //       endpointSecret
//     //     );
//     //   } catch (err) {
//     //     console.log(`⚠️  Webhook signature verification failed.`, err.message);
//     //     return response.sendStatus(400);
//     //   }
//     // }
  
//     // // Handle the event
//     // switch (event.type) {
//     //   case 'payment_intent.succeeded':
//     //     const paymentIntent = event.data.object;
//     //     console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//     //     // Then define and call a method to handle the successful payment intent.
//     //     // handlePaymentIntentSucceeded(paymentIntent);
//     //     break;
//     //   case 'payment_method.attached':
//     //     const paymentMethod = event.data.object;
//     //     // Then define and call a method to handle the successful attachment of a PaymentMethod.
//     //     // handlePaymentMethodAttached(paymentMethod);
//     //     break;
//     //   default:
//     //     // Unexpected event type
//     //     console.log(`Unhandled event type ${event.type}.`);
//     // }
  
//     // // Return a 200 response to acknowledge receipt of the event
//     // response.send();

  









// // export const webhook= async (req,res) => {


//     // const event = req.body;
    
//     //   // Handle the event
//     //   switch (event.type) {
//     //     case 'payment_intent.succeeded':
//     //       const paymentIntent = event.data.object;
//     //       console.log(event.data.charges)
//     //       return  ordersOver(paymentIntent)          // Then define and call a method to handle the successful payment intent.
//     //       // handlePaymentIntentSucceeded(paymentIntent);
//     //     case 'payment_method.attached':
//     //       const paymentMethod = event.data.object;
//     //       console.log("paymentMethod",paymentMethod)

//     //       // Then define and call a method to handle the successful attachment of a PaymentMethod.
//     //       // handlePaymentMethodAttached(paymentMethod);
//     //       break;
//     //     // ... handle other event types
//     //     default:
//     //       console.log(`Unhandled event type ${event.type}`);
//     //   }
    
//     //   // Return a response to acknowledge receipt of the event
//     //   res.json({received: true});
//     // }



// // export const webhook= async(req,res)=>{
// //     if(req.method ==='POST'){
// //       const reqBuffer=await buffer(req)
// //       const payload=reqBuffer.toString()
// //       const sig = req.headers['stripe-signature'];
  
// //       let event;
    
// //       // Verify webhook signature and extract the event.
// //       // See https://stripe.com/docs/webhooks/signatures for more information.
// //       try {
  
// //         event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
// //       } catch (err) {
// //         return response.status(400).send(`Webhook Error: ${err.message}`);
// //       }
  
// //       if  (event.type === 'checkout.session.completed' ) {
          
// //             const paymentIntent = event.data.object;
            
// //             return  ordersOver(paymentIntent)
            
// //         }
// //         else {
// //             console.log(false)
// //         }
// //   }
  
// //   }
// //   export const config ={
// //     api:{
// //         bodyParser:false,
// //         externalResolver:true
// //     }
// //   }
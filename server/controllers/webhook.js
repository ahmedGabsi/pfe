// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import Stripe from 'stripe';
import {buffer} from 'micro'
import Payment from '../models/Payment.js';
import Product from '../models/Product.js';

const stripe =new Stripe('sk_test_51LBnRDAcoLh1JnomRgooDR1KGattPC89QxGqDPdnq36zP2IjYSNAlev4DbDHsuLegwKUDbLLw9WP0EiHXkdxFaeu00PiSGHerk');
const endpointSecret='whsec_418baebb0ba9362cd405a69dbf301afb76fd2654bb547f0f2a6081d1f1986d44';

// Using Express


;


export const webhook=async (request, response) => {
  const event = request.body;
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          // console.log(`PaymentIntent for ${JSON.stringify(paymentIntent)} was successful!`);
          // Then define and call a method to handle the successful payment intent.
          // handlePaymentIntentSucceeded(paymentIntent);
          break;
          case 'checkout.session.completed':
          const session = event.data.object;

          const newPayment= new Payment({
            orders:JSON.parse(session.metadata.orders).map((order,i)=>({...order,email:session.customer_details.email,name:session.customer_details.name,title:JSON.parse(session.metadata.orders_title)[i].title,seller:{...JSON.parse(session.metadata.orders_seller)[i].seller}
            ,buyer:JSON.parse(session.metadata.buyer),delivred:false})),
            buyer:{email:session.customer_details.email,name:session.customer_details.name},
            totalAmount:session.metadata.totalAmount,
            buyer_id:session.metadata.buyer_id

          });
          try {
            
            await newPayment.save();
            response.status(200).json(newPayment);
          } catch ({ message }) {
            response.status(404).json({ message });
          }
          stripe.checkout.sessions.listLineItems(
            session.id,
            function(err, lineItems) {
              // console.log(lineItems);
              // asynchronously called
            })
        // Then define and call a method to handle the successful payment intent.
          // handlePaymentIntentSucceeded(paymentIntent);
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a response to acknowledge receipt of the event
  


}


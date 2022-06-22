import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51LBnRDAcoLh1JnomRgooDR1KGattPC89QxGqDPdnq36zP2IjYSNAlev4DbDHsuLegwKUDbLLw9WP0EiHXkdxFaeu00PiSGHerk"
);

export const createCheckout = async (req, res) => {
  const { buyer, orders, totalAmount } = req.body;

  const transformedOrders = orders.map((order) => ({
    price_data: {
      currency: "bdt",
      product_data: {
        name: order.title,
        description: order.description,
        images: [order.image[0].name],
      },
      unit_amount: order.price * 1000,
    },
    quantity: order.qtyProduct,
  }));
  const session = await stripe.checkout.sessions.create({
    line_items: transformedOrders,
    mode: "payment",
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/cancel`,
    metadata: {
      totalAmount,
      orders_title:JSON.stringify(
        orders.map((order) => ({
          title: order.title
        }))
      ),
      orders_seller:JSON.stringify(
        orders.map((order) => ({
          seller: {email:order.creator.email,firstName:order.creator.firstName,lastName:order.creator.lastName,phone:order.creator.phone||""}
        }))
      )
      ,
      orders: JSON.stringify(
        orders.map((order) => ({
          id: order._id,
          qty: order.qtyProduct,
          price:order.price
                }))
      ),
      buyer_id: buyer.id,
      buyer: JSON.stringify({id:buyer.id,firstName:buyer.firstName,lastName:buyer.lastName,email:buyer.email,phone:buyer.phone||""})
    },
  });

  res.status(200).json({ id: session.id });
};
// buyer: JSON.stringify({id:buyer.id,firstName:buyer.firstName,lastName:buyer.lastName,email:buyer.email,phone:buyer.phone||""})

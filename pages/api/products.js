
import db from '../../util/db';
import Product from '../../models/Product';


const handler = async (req, res) => {
  try {
    await db.connect();
    let products = await Product.find({});
    products = JSON.parse(JSON.stringify(products));
    await db.disconnect();
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default handler;
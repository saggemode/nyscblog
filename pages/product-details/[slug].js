// import { ObjectId } from "bson";
import db from "../../util/db";
import Product from "../../models/Product";
import Head from "next/head";
import ProductDetails from "../../components/Product/ProductDetails";
// import { connectToDatabase } from "../../util/mongodb";

function productDetails({ product }) {
  return (
    <>
      {product?.name && (
        <Head>
          <title>Radon | {product.name}</title>
        </Head>
      )}
      <ProductDetails
        _id={product?._id}
        slug={product?.slug}
        name={product?.name}
        price={product?.price}
        description={product?.description}
        category={product?.category}
        image={product?.image}
      />
    </>
  );
}

export default productDetails;

// export const getStaticPaths = async () => {
//   await db.connect();
//   const products = await Product.find({});
//   const paths = products.map((product) => ({
//     params: { slug: product.slug },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context) => {
//   let product;
//   const { params } = context;
//   const { slug } = params;
//   try {
//     await db.connect();
//     product = await product.findOne({ slug });
//   } catch (err) {
//     console.error(err);
//     return {
//       notFound: true,
//     };
//   }
//   if (!product) {
//     return {
//       notFound: true,
//     };
//   }
//   product = JSON.parse(JSON.stringify(product));
//   return {
//     props: {
//       product,
//     },
//     revalidate: 1,
//   };
// };

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }, "-reviews").lean();
  //const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

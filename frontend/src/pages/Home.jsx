import React from 'react'
import Hero from '../componenets/Layout/Hero'
import GenderCollectionSection from '../componenets/Products/GenderCollectionSection'
import NewArrivals from '../componenets/Products/NewArrivals'
import ProductsDetails from '../componenets/Products/ProductsDetails'
import ProductGrid from '../componenets/Products/ProductGrid'
import FeaturedCollection from '../componenets/Products/FeaturedCollection'
import FeaturesSection from '../componenets/Products/FeaturesSection'
const placeholderProducts = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
      },
    ],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
      },
    ],
  },
  {
    _id: 3,
    name: "Product 4",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
      },
    ],
  },
  {
    _id: 4,
    name: "Product 3",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
      },
    ],
  },
  {
    _id: 5,
    name: "Product 5",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
      },
    ],
  },
  {
    _id: 6,
    name: "Product 6",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
      },
    ],
  },
  {
    _id: 7,
    name: "Product 6",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
      },
    ],
  },
  {
    _id: 8,
    name: "Product 6",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
      },
    ],
  },
]
const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrivals/>
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductsDetails/>

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts}/>
      </div>
      <div className="container mx-auto">
      <FeaturedCollection/>
      <FeaturesSection/>
      </div>
      
      
    </div>
  )
}

export default Home

import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import products from "../ProductData";
import { addItem } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { FaCodeCompare } from "react-icons/fa6";

const fetchProductById = (id) => {
  return products.find((product) => product.id === parseInt(id));
};

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="overflow-hidden relative">
        <img
          src={images[currentIndex]}
          alt="Carousel"
          className="w-full h-[500px] object-cover"
        />
      </div>
    </div>
  );
};

export default function ProductDetail({ onCartOpen ,onCartClick}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Select Color");
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchedProduct = fetchProductById(productId);
    setProduct(fetchedProduct);
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 0 && setQuantity(quantity - 1);
  const handleColorChange = (color) => setSelectedColor(color);

  const carouselImages = [
    "../../images/product/img1.jpg",
    "../../images/product/img2.jpg",
    "../../images/product/img3.jpg",
    "../../images/product/img4.jpg",
    "../../images/product/img5.jpg",
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem({ ...product, quantity }));
    onCartClick()
    onCartOpen();
  };

  return (
    <>
      {/* <Header /> */}
      <div className="flex flex-col justify-center items-center py-20 bg-[#F4F5F8]">
        <h1 className="text-3xl">{product.name}</h1>
        <h1 className="text-xl pt-2 text-gray-500">
          Home / product / {product.name}
        </h1>
      </div>

      <div className="py-10 px-40">
        <div className="flex gap-10">
          <div className="flex-shrink-0">
            <Carousel images={carouselImages} />
          </div>

          <div className="flex-grow">
            <h1 className="font-bold">
              SKT: <span>{product.id}</span>
            </h1>
            <h1 className="font-bold pt-4">
              Availability:<span>1 in Stock</span>
            </h1>
            <p className="font-bold text-2xl pt-4">{product.name}</p>
            <div className="flex gap-5 font-semibold pt-4 text-2xl">
              <h2 className="font-semibold line-through text-2xl">
                ${product.oldPrice}
              </h2>
              <h2 className="font-semibold text-2xl">${product.price}</h2>
            </div>
            <p className="pt-4 font-semibold text-sm text-gray-400 pb-5">
              A long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout. The point
              of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed
            </p>

            <div className="pt-4 flex flex-col">
              <label
                htmlFor="colorDropdown"
                className="font-semibold text-lg pb-3"
              >
                Color:
              </label>
              <select
                id="colorDropdown"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-[300px] p-2 border border-[#FF7004] rounded-md"
              >
                <option value="Select Color" disabled>
                  Select Color
                </option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Black">Black</option>
              </select>
            </div>

            <div className="flex gap-5 pt-4">
              <div className="bg-[#FF7004] text-white flex items-center text-2xl w-[150px] border border-gray-600 rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-2 border-r border-gray-600"
                >
                  -
                </button>
                <div className="px-3 py-2 flex-1 text-center">{quantity}</div>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-2 border-l border-gray-600"
                >
                  +
                </button>
              </div>
              <div className="bg-[#FF7004] py-3 px-8 rounded-md text-white border border-gray-600 font-bold text-sm">
                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="flex gap-5 pt-5">
              <button className="flex gap-2 justify-center items-center">
                <FaRegHeart className="text-gray-500 text-xl" />
                Add to wishlist
              </button>

              <button className="flex gap-2 justify-center items-center">
                <FaCodeCompare className="text-gray-500 text-xl" />
                Add to Compare
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

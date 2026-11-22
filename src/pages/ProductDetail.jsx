import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:3001/menu";

function ProductDetail() {
  const { id } = useParams(); // the id from the url /products/:id
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [price, setPrice] = useState("");
  const [notFound, setNotFound] = useState(false);

  // get the one product when the page opens
  useEffect(() => {
    fetch(API + "/" + id)
      // json-server gives a 404 if the id doesnt exist, so we treat that as an error
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setItem(data);
        setPrice(data.price);
      })
      .catch(() => setNotFound(true));
  }, [id]);

  // PATCH only sends the price, the other fields stay the same
  function savePrice() {
    fetch(API + "/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: Number(price) }),
    })
      .then((res) => res.json())
      // saving the new item in state makes the page update without a reload
      .then((data) => setItem(data));
  }

  function deleteItem() {
    // confirm() stops the delete if the user clicks cancel
    if (window.confirm("Delete this product?")) {
      fetch(API + "/" + id, { method: "DELETE" }).then(() => navigate("/products"));
    }
  }

  if (notFound) return <h2 className="p-6 text-center">Product not found</h2>;
  if (!item) return <p className="p-6 text-center">Loading...</p>;

  return (
    // small screens: full width, bigger screens: centered card
    <div className="w-full md:max-w-lg mx-auto p-4 md:mt-8 md:border md:rounded">
      <h1 className="text-2xl md:text-3xl font-bold">{item.name}</h1>
      <p className="text-gray-600">{item.description}</p>
      <p className="my-3 text-lg">Price: KSh {item.price}</p>

      <label htmlFor="price">Edit price </label>
      <input
        id="price"
        className="border px-2 py-1 w-24"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-3 py-1 ml-2" onClick={savePrice}>
        Save
      </button>

      <button
        className="block mt-5 w-full md:w-auto bg-red-600 text-white px-3 py-1"
        onClick={deleteItem}
      >
        Delete
      </button>
    </div>
  );
}

export default ProductDetail;
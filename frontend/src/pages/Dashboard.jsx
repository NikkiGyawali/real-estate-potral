import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [favs, setFavs] = useState([]);

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      const res = await API.get("/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties", err);
    }
  };

  // Fetch favourites
  const fetchFavs = async () => {
    try {
      const res = await API.get("/favourites");
      setFavs(res.data.map((f) => f.id));
    } catch (err) {
      console.error("Error fetching favourites", err);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchFavs();
  }, []);

  const toggleFav = async (id) => {
    try {
      if (favs.includes(id)) {
        await API.delete(`/favourites/${id}`);
        setFavs(favs.filter((favId) => favId !== id)); // remove locally
      } else {
        await API.post(`/favourites/${id}`);
        setFavs([...favs, id]); // add locally
      }
    } catch (err) {
      console.error("Error toggling favourite", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-gray-500"
    >
      
      <div className="min-h-screen">
        <Navbar favCount={favs.length} />

         <h1 className="text-3xl font-bold mb-4 mt-4 text-center text-yellow-100">
          Dashboard
        </h1>

        <div className="max-w-7xl mx-auto p-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              isFav={favs.includes(p.id)}
              toggleFav={toggleFav}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
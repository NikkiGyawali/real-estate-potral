import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

export default function Favourites() {
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavs = async () => {
    try {
      const res = await API.get("/favourites");
      setFavs(res.data);
    } catch (err) {
      console.error("Error fetching favourites", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFav = async (id) => {
    try {
      await API.delete(`/favourites/${id}`);
      setFavs((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing favourite", err);
    }
  };

  useEffect(() => {
    fetchFavs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-500">
      {/* Pass the current fav count to Navbar */}
      <Navbar favCount={favs.length} />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-yellow-100">
          Favourites 
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : favs.length === 0 ? (
          <p className="text-center text-white mt-10">
            You haven’t added any properties to favourites yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favs.map((p) => (
              <div key={p.id} className="relative">
                <PropertyCard property={p} isFav={true} toggleFav={removeFav} />

                <button
                  onClick={() => removeFav(p.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
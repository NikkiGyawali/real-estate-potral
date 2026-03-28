export default function PropertyCard({ property, isFav, toggleFav }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden">
      
      {/* IMAGE */}
      <div className="relative h-48 w-full">
        <img
          src={property.image || `https://source.unsplash.com/600x400/?house,home&sig=${property.id}`}
          alt={property.title || "property"}
          className="w-full h-full object-cover"
        />
        {/* Price Badge */}
        <div className="absolute top-3 left-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full shadow-md text-sm font-medium">
          Rs. {property.price?.toLocaleString() || "N/A"}
        </div>
        {/* Favourite Button Icon */}
        <button
          onClick={() => toggleFav(property.id)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md text-sm transition-colors ${
            isFav ? "bg-red-500 text-white hover:bg-red-600" : "bg-white text-gray-800 hover:bg-gray-200"
          }`}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          {property.title || "Beautiful Property"}
        </h2>
        <p className="text-gray-500 text-sm mb-2">{property.location}</p>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {property.description || "A modern property with great amenities."}
        </p>

        <button
          onClick={() => toggleFav(property.id)}
          className={`w-full py-2 rounded-xl font-semibold transition-colors ${
            isFav
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          {isFav ? "Remove from Favourites" : "Add to Favourites"}
        </button>
      </div>
    </div>
  );
}
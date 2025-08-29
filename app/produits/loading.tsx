export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-gray-500">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-3"></div>
      <span>Chargement des produit...</span>
    </div>
  );
}
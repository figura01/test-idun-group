export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-gray-500">
      <h1 className="text-2xl font-bold mb-2">Produit introuvable</h1>
      <p>Le produit que vous recherchez n&apos;existe pas ou a été supprimé.</p>
    </div>
  );
}
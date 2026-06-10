export function Chargement() {
  return (
    <div className="flex justify-center py-20" role="status" aria-label="Chargement">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
    </div>
  )
}

export function Introuvable({ message }: { message?: string }) {
  return (
    <div className="py-20 text-center text-gray-500">
      {message ?? 'Données introuvables. Le traitement est peut-être encore en cours.'}
    </div>
  )
}

export default function CharacterModal({ character, onClose }: { character: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl max-w-md w-full relative border border-marvelWhite/20">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-marvelWhite hover:text-marvelRed transition-colors"
        >
          &times;
        </button>
        <img
          src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
          alt={character.name}
          className="w-full h-72 object-cover rounded-xl mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-marvelWhite">{character.name}</h2>
        <p className="text-marvelWhite">{character.description || 'Sem descrição.'}</p>
      </div>
    </div>
  );
}

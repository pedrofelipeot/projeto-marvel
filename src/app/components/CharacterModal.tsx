import type { Character } from '../interface/character';

export default function CharacterModal({ character, onClose }: { character: Character; onClose: () => void }) {
  const { name, thumbnail, description } = character;

  const imageUrl = thumbnail.path.endsWith('.jpg') || thumbnail.path.endsWith('.png')
    ? thumbnail.path
    : `${thumbnail.path}/standard_fantastic.${thumbnail.extension}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-tr from-red-900 via-black to-black pt-12 px-15 pb-6
        rounded-3xl shadow-2xl max-w-md w-full relative border-4 border-yellow-400 animate-fadeIn"
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="
            absolute top-4 right-4 
            text-5xl text-yellow-400 
            hover:text-red-600 
            transition-colors 
            cursor-pointer 
            bg-black bg-opacity-50 
            rounded-full 
            w-12 h-12 
            flex items-center justify-center
            shadow-lg
            z-50
          "
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-72 object-cover rounded-xl mb-6"
          loading="lazy"
        />
        <h2 className="text-3xl font-extrabold mb-4 text-yellow-400">{name}</h2>
        <p className="text-marvelWhite text-lg">{description || 'Sem descrição.'}</p>
      </div>
    </div>
  );
}

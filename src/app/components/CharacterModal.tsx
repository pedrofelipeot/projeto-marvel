import Image from 'next/image';
import type { Character } from '../interface/character';

export default function CharacterModal({
  character,
  onClose,
}: {
  character: Character;
  onClose: () => void;
}) {
  const { name, thumbnail, description } = character;

  const imageUrl = (thumbnail.path.endsWith('.jpg') || thumbnail.path.endsWith('.png'))
    ? thumbnail.path
    : `${thumbnail.path}/standard_fantastic.${thumbnail.extension}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-md flex items-center justify-center z-50 cursor-pointer p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-gradient-to-tr from-red-900 via-black to-black 
          pt-16 px-10 pb-10 rounded-3xl shadow-2xl 
          max-w-xl w-full relative border-4 border-yellow-400 animate-fadeIn
        "
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="
            absolute top-5 right-5 
            text-6xl text-yellow-400 
            hover:text-red-600 
            transition-colors 
            cursor-pointer 
            bg-black bg-opacity-60 
            rounded-full 
            w-14 h-14 
            flex items-center justify-center
            shadow-lg
            z-50
          "
        >
          &times;
        </button>
        <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
        <h2 className="text-4xl font-extrabold mb-6 text-yellow-400">{name}</h2>
        <p className="text-marvelWhite text-xl leading-relaxed">{description || 'Sem descrição.'}</p>
      </div>
    </div>
  );
}

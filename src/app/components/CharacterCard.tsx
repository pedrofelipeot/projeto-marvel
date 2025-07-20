import Image from 'next/image';
import type { Character } from '../interface/character';

export default function CharacterCard({ character }: { character: Character }) {
  const { name, thumbnail } = character;

  const imageUrl = (thumbnail.path.endsWith('.jpg') || thumbnail.path.endsWith('.png'))
    ? thumbnail.path
    : `${thumbnail.path}/standard_fantastic.${thumbnail.extension}`;

  return (
    <div className="w-48 bg-gradient-to-br from-red-900 via-black to-black rounded-3xl shadow-lg overflow-hidden border-4 border-red-700 hover:border-yellow-400 transition-all duration-300">
      <div className="relative w-full h-56">
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t-3xl"
          loading="lazy"
          sizes="192px"
        />
      </div>
      <h2 className="font-bold text-center text-xl py-3 text-yellow-400 drop-shadow-md select-text">
        {name}
      </h2>
    </div>
  );
}

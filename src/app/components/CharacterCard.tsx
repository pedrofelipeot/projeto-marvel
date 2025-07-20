import Image from 'next/image';
import type { Character } from '../interface/character';

export default function CharacterCard({ character }: { character: Character }) {
  const { name, thumbnail } = character;

  const imageUrl =
    thumbnail.path.endsWith('.jpg') || thumbnail.path.endsWith('.png')
      ? thumbnail.path
      : `${thumbnail.path}/standard_fantastic.${thumbnail.extension}`;

  return (
    <div
      className="
        w-full
        max-w-xs
        min-w-[180px]
        bg-gradient-to-br from-red-900 via-black to-black
        rounded-3xl shadow-lg overflow-hidden
        border-4 border-red-700
        transition-colors duration-300
        hover:border-yellow-400
        flex flex-col
        select-text
        aspect-[3/4]
      "
    >
      <div className="relative w-full flex-grow">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 280px, 320px"
          style={{ objectFit: 'cover' }}
          className="rounded-t-3xl"
          loading="lazy"
          priority={false}
        />
      </div>
      <h2 className="font-bold text-center text-xl py-3 text-yellow-400 drop-shadow-md">
        {name}
      </h2>
    </div>
  );
}

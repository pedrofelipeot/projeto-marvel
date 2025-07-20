export default function CharacterCard({ character }: { character: any }) {
  const { name, thumbnail } = character;

  return (
    <div className="bg-marvelBlack rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer overflow-hidden">
      <img
        src={`${thumbnail.path}/standard_fantastic.${thumbnail.extension}`}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <h2 className="font-bold text-center text-lg py-2 text-marvelWhite">{name}</h2>
    </div>
  );
}

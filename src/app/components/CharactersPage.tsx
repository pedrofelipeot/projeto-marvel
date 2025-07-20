'use client';
import { useEffect, useState } from 'react';
import { fetchMarvelCharacters } from '../lib/marvelApi';
import CharacterCard from './CharacterCard';
import CharacterModal from './CharacterModal';

export default function CharactersPage() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [seriesFilter, setSeriesFilter] = useState<string | null>(null);
  const [eventFilter, setEventFilter] = useState<string | null>(null);
  const [appearanceFilter, setAppearanceFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<any | null>(null);

  // Carrega personagens com filtros server-side (search, series, events)
  const loadCharacters = async () => {
    const data = await fetchMarvelCharacters(search, seriesFilter, eventFilter);
    setCharacters(data.data.results);
  };

  useEffect(() => {
    loadCharacters();
  }, [search, seriesFilter, eventFilter]);

  // Filtragem local por aparições
  const filteredCharacters = appearanceFilter
    ? characters.filter((c) => {
        if (appearanceFilter === 'few') return c.comics.available <= 50;
        if (appearanceFilter === 'mid') return c.comics.available > 50 && c.comics.available <= 200;
        if (appearanceFilter === 'many') return c.comics.available > 200;
        return true;
      })
    : characters;

  return (
    <div className="p-6 bg-marvelBlack min-h-screen text-marvelWhite">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar personagem"
          className="flex-1 p-3 rounded-lg shadow-md bg-marvelWhite/10 text-marvelWhite placeholder-marvelWhite/70 focus:outline-none focus:ring-2 focus:ring-marvelRed"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <select
          className="p-3 rounded-lg shadow-md bg-marvelWhite/10 text-marvelWhite focus:outline-none focus:ring-2 focus:ring-marvelRed"
          onChange={(e) => setSeriesFilter(e.target.value || null)}
          value={seriesFilter || ''}
        >
          <option value="">Filtrar por Série</option>
          <option value="354">Avengers</option>
          <option value="9086">X-Men</option>
          <option value="1842">Spider-Verse</option>
          <option value="363">Fantastic Four</option>
        </select>

        <select
          className="p-3 rounded-lg shadow-md bg-marvelWhite/10 text-marvelWhite focus:outline-none focus:ring-2 focus:ring-marvelRed"
          onChange={(e) => setEventFilter(e.target.value || null)}
          value={eventFilter || ''}
        >
          <option value="">Filtrar por Evento</option>
          <option value="116">Civil War</option>
          <option value="233">Secret Invasion</option>
          <option value="314">Infinity War</option>
          <option value="240">House of M</option>
        </select>

        <select
          className="p-3 rounded-lg shadow-md bg-marvelWhite/10 text-marvelWhite focus:outline-none focus:ring-2 focus:ring-marvelRed"
          onChange={(e) => setAppearanceFilter(e.target.value || null)}
          value={appearanceFilter || ''}
        >
          <option value="">Filtrar por Aparições</option>
          <option value="few">Poucas (0-50)</option>
          <option value="mid">Moderadas (51-200)</option>
          <option value="many">Muitas (200+)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredCharacters.map((char) => (
          <div key={char.id} onClick={() => setSelected(char)}>
            <CharacterCard character={char} />
          </div>
        ))}
      </div>

      {selected && <CharacterModal character={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

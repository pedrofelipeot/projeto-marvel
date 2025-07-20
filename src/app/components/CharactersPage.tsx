'use client';

import { useEffect, useState } from 'react';
import { fetchMarvelCharacters } from '../lib/marvelApi';
import CharacterCard from './CharacterCard';
import CharacterModal from './CharacterModal';
import type { Character } from '../interface/character';

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [seriesFilter, setSeriesFilter] = useState<string | null>(null);
  const [modifiedFilter, setModifiedFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Character | null>(null);

  function getModifiedSinceDate() {
    const today = new Date();
    if (modifiedFilter === 'recent') {
      const recentDate = new Date(today.setFullYear(today.getFullYear() - 2));
      return recentDate.toISOString().split('T')[0];
    }
    return null;
  }

  const loadCharacters = async () => {
    const modifiedSince = getModifiedSinceDate();
    const data = await fetchMarvelCharacters(search, seriesFilter, modifiedSince);
    let results: Character[] = data.data.results;

    if (seriesFilter) {
      results = results.filter((char) => {
        return char.series?.items?.some((serie) => {
          const seriesId = serie.resourceURI.split('/').pop();
          return seriesId === seriesFilter;
        });
      });
    }

    if (modifiedFilter === 'recent') {
      results.sort((a, b) => {
        if (!a.modified) return 1;
        if (!b.modified) return -1;
        return new Date(b.modified).getTime() - new Date(a.modified).getTime();
      });
    } else if (modifiedFilter === 'old') {
      results.sort((a, b) => {
        if (!a.modified) return 1;
        if (!b.modified) return -1;
        return new Date(a.modified).getTime() - new Date(b.modified).getTime();
      });
    }

    setCharacters(results);
  };

  useEffect(() => {
    loadCharacters();
  }, [search, seriesFilter, modifiedFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-marvelBlack text-marvelWhite select-none">
      <header className="mb-8 mt-16 text-center px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 drop-shadow-lg">
          Marvel
        </h1>
        <p className="mt-2 text-marvelWhite/80 italic tracking-wider">
          Explore os heróis e vilões do Universo Marvel
        </p>
      </header>

      <main className="flex-grow px-8">
        <div className="flex flex-col md:flex-row gap-6 mb-10 max-w-6xl mx-auto">
          <input
            type="text"
            placeholder="🔍 Buscar personagem"
            className="flex-1 p-4 rounded-xl bg-gray-900/70 text-white placeholder-white focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-75 shadow-xl shadow-black/70 transition"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <select
            className="p-4 rounded-xl bg-gray-900/70 text-white focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-75 shadow-xl shadow-black/70 transition"
            onChange={(e) => setSeriesFilter(e.target.value || null)}
            value={seriesFilter || ''}
          >
            <option className="text-black" value="">
              Filtrar por Série
            </option>
            <option className="text-black" value="354">
              Avengers
            </option>
            <option className="text-black" value="800">
              X-Men
            </option>
            <option className="text-black" value="363">
              Fantastic Four
            </option>
          </select>

          <select
            className="p-4 rounded-xl bg-gray-900/70 text-white focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-75 shadow-xl shadow-black/70 transition"
            onChange={(e) => setModifiedFilter(e.target.value)}
            value={modifiedFilter}
          >
            <option className="text-black" value="all">
              Todos
            </option>
            <option className="text-black" value="recent">
              Mais Recentes
            </option>
            <option className="text-black" value="old">
              Mais Antigos
            </option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {characters.map((char) => (
            <div
              key={char.id}
              onClick={() => setSelected(char)}
              className="cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-700/80 rounded-3xl"
            >
              <CharacterCard character={char} />
            </div>
          ))}
        </div>
      </main>

      {selected && (
        <CharacterModal
          character={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <footer className="w-full py-6 mt-12 bg-[#0d0d0d] text-center text-sm text-marvelWhite/70 select-none">
        <div className="max-w-6xl mx-auto px-8">
          <p>&copy; {new Date().getFullYear()} Desenvolvido por Pedro Felipe.</p>
          <p>
            <a
              href="https://github.com/pedrofelipeot/projeto-marvel"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-red-500 transition-colors"
            >
              Meu GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

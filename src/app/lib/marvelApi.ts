import type { Character } from '../interface/character';

export const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function fetchMarvelCharacters(
  nameStartsWith?: string,
  seriesId?: string | null,
  modifiedSince?: string | null
): Promise<{ data: { results: Character[] } }> {
  if (useMock) {
    console.log('✅ Usando MOCK');

    try {
      const res = await fetch('/mocks/characters.json');
      if (!res.ok) throw new Error('Falha ao carregar mock JSON');
      const json = await res.json();

      let filtered: Character[] = json.data.results;

      if (nameStartsWith) {
        filtered = filtered.filter((c: Character) =>
          c.name.toLowerCase().startsWith(nameStartsWith.toLowerCase())
        );
      }

      if (seriesId) {
        filtered = filtered.filter((c: Character) =>
          c.series?.items?.some((item) => item.resourceURI.includes(seriesId))
        );
      }

      if (modifiedSince) {
        filtered = filtered.filter((c: Character) =>
          new Date(c.modified) >= new Date(modifiedSince)
        );
      }

      return {
        data: {
          results: filtered.slice(0, 20),
        },
      };
    } catch (err) {
      console.error('❌ Erro ao carregar mock:', err);
      return { data: { results: [] } };
    }
  }

  // Chama API interna do Next.js (backend)
  const query = new URLSearchParams();
  if (nameStartsWith) query.append('nameStartsWith', nameStartsWith);
  if (seriesId) query.append('seriesId', seriesId ?? '');
  if (modifiedSince) query.append('modifiedSince', modifiedSince ?? '');

  const response = await fetch(`/api/marvel-characters?${query.toString()}`);

  if (!response.ok) {
    throw new Error('Erro na API interna');
  }

  return response.json();
}

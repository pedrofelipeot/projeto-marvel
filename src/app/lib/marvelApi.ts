// src/lib/marvelApi.ts
import axios from 'axios';
import md5 from 'md5';

const baseUrl = 'https://gateway.marvel.com/v1/public';

// Variáveis de ambiente para server-side
const publicKey = process.env.MARVEL_PUBLIC_KEY!;
const privateKey = process.env.MARVEL_PRIVATE_KEY!;
export const useMock = process.env.USE_MOCK === 'true';

console.log("🔎 USE_MOCK:", useMock); // Só aparece no terminal node.js

// Agora com suporte a filtros: nameStartsWith, seriesId, eventId
export async function fetchMarvelCharacters(
  nameStartsWith?: string,
  seriesId?: string | null,
  eventId?: string | null
) {
  if (useMock) {
    console.log("✅ Usando MOCK");
    const res = await import('../mocks/characters.json');
    const all = res.default.data.results;

    let filtered = all;

    if (nameStartsWith) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().startsWith(nameStartsWith.toLowerCase())
      );
    }

    if (seriesId) {
      filtered = filtered.filter((c) =>
        c.series?.items?.some((item: any) => item.resourceURI.includes(seriesId))
      );
    }

    if (eventId) {
      filtered = filtered.filter((c) =>
        c.events?.items?.some((item: any) => item.resourceURI.includes(eventId))
      );
    }

    return { data: { results: filtered.slice(0, 20) } };
  }

  console.log("🔴 Usando API REAL");

  const ts = Date.now().toString();
  const hash = md5(ts + privateKey + publicKey);

  // Monta os params da requisição, incluindo só se tiver valor
  const params: Record<string, any> = {
    ts,
    apikey: publicKey,
    hash,
    limit: 20,
  };

  if (nameStartsWith) params.nameStartsWith = nameStartsWith;
  if (seriesId) params.series = seriesId;
  if (eventId) params.events = eventId;

  const response = await axios.get(`${baseUrl}/characters`, { params });

  return response.data;
}

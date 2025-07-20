import axios from 'axios';
import md5 from 'md5';

const baseUrl = 'https://gateway.marvel.com/v1/public';

const publicKey = process.env.MARVEL_PUBLIC_KEY!;
const privateKey = process.env.MARVEL_PRIVATE_KEY!;
export const useMock = process.env.USE_MOCK === 'true';

console.log("🔎 USE_MOCK:", useMock); // Mantém o log original

export async function fetchMarvelCharacters(
  nameStartsWith?: string,
  seriesId?: string | null,
  modifiedSince?: string | null
) {
  if (useMock) {
    console.log("✅ Usando MOCK");
    const res = await import('../mocks/characters.json');
    let filtered = res.default.data.results;

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

    if (modifiedSince) {
      filtered = filtered.filter((c) => new Date(c.modified) >= new Date(modifiedSince));
    }

    return { data: { results: filtered.slice(0, 20) } };
  }

  console.log("🔴 Usando API REAL");

  const ts = Date.now().toString();
  const hash = md5(ts + privateKey + publicKey);

  const params: Record<string, any> = {
    ts,
    apikey: publicKey,
    hash,
    limit: 20,
  };

  if (nameStartsWith) params.nameStartsWith = nameStartsWith;
  if (seriesId) params.series = seriesId;
  if (modifiedSince) params.modifiedSince = modifiedSince;

  const response = await axios.get(`${baseUrl}/characters`, { params });

  return response.data;
}

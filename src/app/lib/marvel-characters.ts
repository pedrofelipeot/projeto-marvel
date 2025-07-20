import type { NextApiRequest, NextApiResponse } from 'next';
import md5 from 'md5';
import axios from 'axios';

const baseUrl = 'https://gateway.marvel.com/v1/public';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const privateKey = process.env.MARVEL_PRIVATE_KEY!;
  const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
  const ts = Date.now().toString();
  const hash = md5(ts + privateKey + publicKey);

  const { nameStartsWith, seriesId, modifiedSince } = req.query;

  const params = {
    ts,
    apikey: publicKey,
    hash,
    limit: 20,
    ...(nameStartsWith ? { nameStartsWith } : {}),
    ...(seriesId ? { series: seriesId } : {}),
    ...(modifiedSince ? { modifiedSince } : {}),
  };

  try {
    const response = await axios.get(`${baseUrl}/characters`, { params });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar personagens da Marvel' });
  }
}

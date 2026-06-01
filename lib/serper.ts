export async function serperSearch(query: string, num = 15) {
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': process.env.SERPER_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: query, num, gl: 'in', hl: 'en' }),
  });

  if (!res.ok) throw new Error('Serper API failed');
  return res.json();
}

export async function serperRelatedSearches(query: string) {
  const data = await serperSearch(query);
  return data.relatedSearches || [];
}

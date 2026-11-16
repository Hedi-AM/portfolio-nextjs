export const profile = ${{ values | dump | safe }};
export const list = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);

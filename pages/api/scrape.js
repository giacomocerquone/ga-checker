// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export default async function handler(req, res) {
  try {
    if (!req.query.url || !isValidHttpUrl(req.query.url)) {
      throw new Error();
    }
    const fetchRes = await fetch(req.query.url);
    const html = await fetchRes.text();

    res
      .status(200)
      .json({ ga: new RegExp(/GoogleAnalyticsObject|ga\(/).test(html) });
  } catch (e) {
    res.status(500).json({ error: true });
  }
}

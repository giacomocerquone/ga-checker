// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    const fetchRes = await fetch(req.query.url);
    const html = await fetchRes.text();

    res
      .status(200)
      .json({ ga: new RegExp(/GoogleAnalyticsObject|ga\(/).test(html) });
  } catch (e) {
    res.status(500);
  }
}

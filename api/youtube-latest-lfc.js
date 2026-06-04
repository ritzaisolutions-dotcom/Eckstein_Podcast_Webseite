const PLAYLIST_ID = process.env.YOUTUBE_LFC_PLAYLIST_ID || "PLx_pldXvpOEuPuQ2VFNcbyy14MmXhPtUw";
const MIN_DURATION_SEC = Number(process.env.YOUTUBE_LFC_MIN_DURATION_SEC || 1200);
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;

function parseEntries(xml) {
  const entries = [];
  const re = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const block = m[1];
    const videoId = (block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
    const title = (block.match(/<title>([^<]*)<\/title>/) || [])[1];
    const published = (block.match(/<published>([^<]+)<\/published>/) || [])[1];
    const duration = (block.match(/duration=['"](\d+)['"]/) || [])[1];
    if (videoId && title) {
      entries.push({ videoId, title: title.replace(/&amp;/g, "&"), published, durationSec: duration ? Number(duration) : null });
    }
  }
  return entries;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }
  try {
    const rssRes = await fetch(RSS_URL, { headers: { "User-Agent": "EcksteinPodcast/1.0" } });
    if (!rssRes.ok) return res.status(502).json({ error: "rss_fetch_failed" });
    const xml = await rssRes.text();
    const entries = parseEntries(xml);
    for (const entry of entries) {
      if (entry.durationSec != null && entry.durationSec < MIN_DURATION_SEC) continue;
      res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=600");
      return res.status(200).json({
        videoId: entry.videoId,
        title: entry.title,
        published: entry.published,
        watchUrl: `https://www.youtube.com/watch?v=${entry.videoId}`,
        playlistId: PLAYLIST_ID,
        format: "lfc",
      });
    }
    return res.status(503).json({ error: "no_lfc_video" });
  } catch {
    return res.status(500).json({ error: "internal_error" });
  }
}

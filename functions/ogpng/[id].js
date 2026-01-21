export async function onRequest({ params }) {
  const videoId = params.id;

  const svgUrl = `https://bhakti-bhajan-sansar.pages.dev/og/${videoId}`;

  // Cloudflare Image Resizing will rasterize SVG → PNG
  const pngUrl =
    `https://bhakti-bhajan-sansar.pages.dev/cdn-cgi/image/format=png,width=1080,height=1920/${svgUrl}`;

  return Response.redirect(pngUrl, 302);
}

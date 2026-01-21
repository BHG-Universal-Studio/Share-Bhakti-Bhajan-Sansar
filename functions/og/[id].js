export async function onRequest({ params }) {
  const videoId = params.id;

  const thumbnail =
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const logo =
    "https://bhakti-bhajan-sansar.pages.dev/logo.png";

  const svg = `
<svg width="1080" height="1920" viewBox="0 0 1080 1920"
     xmlns="http://www.w3.org/2000/svg">

  <!-- Background image (center cropped portrait) -->
  <image
    href="${thumbnail}"
    x="-420"
    y="420"
    width="1920"
    height="1080"
    transform="rotate(-90 540 960)"
    preserveAspectRatio="xMidYMid slice"
  />

  <!-- Dark gradient overlay -->
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="black" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="black" stop-opacity="0.15"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="1920" fill="url(#g)" />

  <!-- App logo -->
  <image
    href="${logo}"
    x="880"
    y="1660"
    width="160"
    height="160"
    rx="32"
    ry="32"
  />

</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400"
    }
  });
}

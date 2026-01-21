export async function onRequest({ params }) {
  const videoId = params.id;

  const thumbUrl =
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const logoUrl =
    "https://bhakti-bhajan-sansar.pages.dev/logo.png";

  // Fetch images
  const [thumbRes, logoRes] = await Promise.all([
    fetch(thumbUrl),
    fetch(logoUrl)
  ]);

  const thumbBlob = await thumbRes.blob();
  const logoBlob = await logoRes.blob();

  // Create canvas
  const canvas = new OffscreenCanvas(1080, 1920);
  const ctx = canvas.getContext("2d");

  // Decode images
  const thumbBitmap = await createImageBitmap(thumbBlob);
  const logoBitmap = await createImageBitmap(logoBlob);

  // Draw rotated background
  ctx.save();
  ctx.translate(540, 960);
  ctx.rotate(-Math.PI / 2);
  ctx.drawImage(
    thumbBitmap,
    -960,
    -540,
    1920,
    1080
  );
  ctx.restore();

  // Gradient overlay
  const gradient = ctx.createLinearGradient(0, 1920, 0, 0);
  gradient.addColorStop(0, "rgba(0,0,0,0.75)");
  gradient.addColorStop(1, "rgba(0,0,0,0.15)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1920);

  // Logo overlay
  ctx.drawImage(logoBitmap, 880, 1660, 160, 160);

  // Export PNG
  const pngBlob = await canvas.convertToBlob({ type: "image/png" });
  const buffer = await pngBlob.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400"
    }
  });
}

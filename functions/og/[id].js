export async function onRequest({ params }) {
  const videoId = params.id;

  const thumbUrl =
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Fetch YouTube thumbnail
  const res = await fetch(thumbUrl);
  if (!res.ok) {
    return new Response("Thumbnail not found", { status: 404 });
  }

  const blob = await res.blob();
  const bitmap = await createImageBitmap(blob);

  // Target portrait size
  const WIDTH = 1080;
  const HEIGHT = 1920;

  const canvas = new OffscreenCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // ---- CENTER CROP LOGIC ----
  const srcW = bitmap.width;
  const srcH = bitmap.height;

  const srcAspect = srcW / srcH;
  const dstAspect = WIDTH / HEIGHT;

  let cropW, cropH, cropX, cropY;

  if (srcAspect > dstAspect) {
    // source is wider → crop left/right
    cropH = srcH;
    cropW = srcH * dstAspect;
    cropX = (srcW - cropW) / 2;
    cropY = 0;
  } else {
    // source is taller → crop top/bottom
    cropW = srcW;
    cropH = srcW / dstAspect;
    cropX = 0;
    cropY = (srcH - cropH) / 2;
  }

  ctx.drawImage(
    bitmap,
    cropX, cropY, cropW, cropH,
    0, 0, WIDTH, HEIGHT
  );

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

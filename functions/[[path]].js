export async function onRequest(context) {
  const url = new URL(context.request.url);
  const videoId = url.pathname.replace("/", "").trim();

  const ogImage = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "https://bhakti-bhajan-sansar.pages.dev/logo.png";

  const ogVideoUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : url.href;

  const asset = await context.env.ASSETS.fetch(
    new Request(`${url.origin}/index.html`)
  );

  let html = await asset.text();

  html = html.replace(
    "</head>",
    `
<meta property="og:type" content="video.other" />
<meta property="og:site_name" content="भक्ति भजन संसार" />
<meta property="og:title" content="भक्ति भजन देखें" />
<meta property="og:description"
      content="लाइव भजन, आरती, मंत्र और आध्यात्मिक वीडियो देखें — भक्ति भजन संसार" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1280" />
<meta property="og:image:height" content="720" />
<meta property="og:url" content="${url.href}" />

<!-- Optional video classification -->
<meta property="og:video:url" content="${ogVideoUrl}" />
<meta property="og:video:secure_url" content="${ogVideoUrl}" />
<meta property="og:video:type" content="text/html" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
</head>`
  );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "public, max-age=300"
    }
  });
}

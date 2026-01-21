export async function onRequest(context) {
  const url = new URL(context.request.url);
  const videoId = url.pathname.replace("/", "").trim();

  // ✅ IMPORTANT: use PNG endpoint for WhatsApp
  const ogImage = `${url.origin}/ogpng/${videoId}`;

  // Fetch the real index.html from Pages
  const asset = await context.env.ASSETS.fetch(
    new Request(`${url.origin}/index.html`)
  );

  let html = await asset.text();

  // 🔥 Inject OG tags dynamically
  html = html.replace(
    "</head>",
    `
<meta property="og:type" content="website" />
<meta property="og:site_name" content="भक्ति भजन संसार" />
<meta property="og:title" content="भक्ति भजन देखें" />
<meta property="og:description"
      content="लाइव भजन, आरती, मंत्र और आध्यात्मिक वीडियो देखें — भक्ति भजन संसार" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1080" />
<meta property="og:image:height" content="1920" />
<meta property="og:image:type" content="image/png" />
<meta property="og:url" content="${url.href}" />
<meta name="twitter:card" content="summary_large_image" />
</head>`
  );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  });
}

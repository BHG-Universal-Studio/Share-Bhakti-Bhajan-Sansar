import { ImageResponse } from "@cloudflare/pages-plugin-image-response";

export async function onRequest({ params }) {
  const videoId = params.id;

  const thumbnail =
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const logo =
    "https://bhakti-bhajan-sansar.pages.dev/logo.png";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1920px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* Background image (portrait crop) */}
        <img
          src={thumbnail}
          style={{
            width: "1920px",
            height: "1080px",
            objectFit: "cover",
            transform: "rotate(90deg)"
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15))"
          }}
        />

        {/* App logo */}
        <img
          src={logo}
          style={{
            position: "absolute",
            bottom: "60px",
            right: "40px",
            width: "160px",
            height: "160px",
            borderRadius: "32px"
          }}
        />
      </div>
    ),
    {
      width: 1080,
      height: 1920
    }
  );
}

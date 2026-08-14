import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Kitchen District — Cloud kitchen infrastructure in Jeddah";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Concrete & Emerald share card; same brand-led artwork for both locales. */
export default async function Image() {
  const [jakarta, monogram] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/PlusJakartaSans-ExtraBold.ttf")),
    readFile(join(process.cwd(), "public/kd-monogram.png")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f5f4f1",
          backgroundImage:
            "linear-gradient(#e7e5e0 1px, transparent 1px), linear-gradient(90deg, #e7e5e0 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          fontFamily: "Jakarta",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img
            src={`data:image/png;base64,${monogram.toString("base64")}`}
            alt=""
            width={84}
            height={84}
          />
          <div
            style={{
              fontSize: 34,
              letterSpacing: 10,
              color: "#0b4a37",
            }}
          >
            KITCHEN DISTRICT
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 84,
              lineHeight: 1.05,
              color: "#111111",
            }}
          >
            <div>Cloud kitchen infrastructure</div>
            <div style={{ display: "flex", gap: 24 }}>
              <div>in</div>
              <div style={{ color: "#107a5a" }}>Jeddah.</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 64,
                height: 10,
                background: "#107a5a",
                borderRadius: 5,
              }}
            />
            <div style={{ fontSize: 30, color: "#3d6b5c" }}>
              kitchendistricts.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Jakarta", data: jakarta, weight: 800, style: "normal" }],
    },
  );
}

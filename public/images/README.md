# Images

Drop your assets here. Files in `public/` are served from the site root.

## `crest/`

Place the school crest / logo here.

- **Recommended filename:** `ananda-crest.png` (or `crest.png`, `crest.svg`)
- **Recommended size:** Square, at least `512x512px` (transparent background preferred)
- **Reference path in code:** `/images/crest/ananda-crest.png`

When `ananda-crest.png` is added, the Navbar, Footer, and Hero will display it automatically. Until then, the text "A" monogram is shown as a fallback in the Navbar and Footer.

## `gallery/`

Place batch photos here. Filename naming convention: `01.jpg`, `02.jpg`, etc.

- **Recommended size:** At least `1200px` on the longest edge
- **Format:** `.jpg` for photos, `.png` for graphics
- **Reference path in code:** `/images/gallery/01.jpg`

After uploading, update [`data/gallery.ts`](../../data/gallery.ts) to point each `src` entry to the new local path. Example:

```ts
{
  id: "g1",
  src: "/images/gallery/01.jpg",
  alt: "School building",
  caption: "Our beloved alma mater",
  span: "wide",
}
```

The optional `span` property controls grid layout on tablet and desktop:

- `"wide"`: spans 2 columns
- `"tall"`: spans 2 rows
- `"default"` (or omitted): single cell

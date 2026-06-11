export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  span?: "wide" | "tall" | "default";
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/gallery/01.JPG",
    alt: "ACOBA 2020 batch photo 1",
    caption: "ACOBA 2020",
    span: "wide",
  },
  {
    id: "g2",
    src: "/images/gallery/02.JPG",
    alt: "ACOBA 2020 batch photo 2",
    caption: "ACOBA 2020",
  },
  {
    id: "g3",
    src: "/images/gallery/03.JPG",
    alt: "ACOBA 2020 batch photo 3",
    caption: "ACOBA 2020",
    span: "tall",
  },
  {
    id: "g4",
    src: "/images/gallery/04.JPG",
    alt: "ACOBA 2020 batch photo 4",
    caption: "ACOBA 2020",
  },
  {
    id: "g5",
    src: "/images/gallery/05.JPG",
    alt: "ACOBA 2020 batch photo 5",
    caption: "ACOBA 2020",
    span: "wide",
  },
  {
    id: "g6",
    src: "/images/gallery/06.png",
    alt: "ACOBA 2020 batch photo 6",
    caption: "ACOBA 2020",
    span: "tall",
  },
  {
    id: "g7",
    src: "/images/gallery/07.jpg",
    alt: "ACOBA 2020 batch photo 7",
    caption: "ACOBA 2020",
    span: "tall",
  },
  {
    id: "g8",
    src: "/images/gallery/08.jpg",
    alt: "ACOBA 2020 batch photo 8",
    caption: "ACOBA 2020",
    span: "tall",
  },
  {
    id: "g9",
    src: "/images/gallery/09.jpg",
    alt: "ACOBA 2020 batch photo 9",
    caption: "ACOBA 2020",
    span: "tall",
  }
];

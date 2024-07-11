export interface RootObject {
  "@attr": Attr;
  artist: Artist;
  duration: string;
  image: ImageTrack[];
  listeners: string;
  mbid: string;
  name: string;
  streamable: Streamable;
  url: string;
}

export interface Streamable {
  "#text": string;
  fulltrack: string;
}

export interface ImageTrack {
  "#text": string;
  size: string;
}

export interface Artist {
  mbid: string;
  name: string;
  url: string;
}

export interface Attr {
  rank: string;
}

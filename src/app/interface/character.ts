export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI?: string;
  comics?: {
    available: number;
    items?: { resourceURI: string; name: string }[];
  };
  series?: {
    available: number;
    items?: { resourceURI: string; name: string }[];
  };
  stories?: {
    available: number;
    items?: { resourceURI: string; name: string }[];
  };
  events?: {
    available: number;
    items?: { resourceURI: string; name: string }[];
  };
  urls?: { type: string; url: string }[];
}

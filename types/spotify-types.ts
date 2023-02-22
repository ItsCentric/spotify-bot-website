type Artist = {
    externalUrls: ExternalURLs;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: 'artist';
    uri: string;
}

type Album = {
    albumType: string;
    totalTracks: number;
    availableMarkets: string[];
    externalUrls: ExternalURLs;
    href: string;
    id: string;
    images: Image[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: 'day' | 'month' | 'year';
    restrictions: Restrictions;
    type: 'album';
    uri: string;
    copyrights: Copyright[];
    externalIds: ExternalIds;
    genres: string[];
    label: string;
    popularity: number;
    albumGroup: 'album' | 'single' | 'compilation' | 'appears_on';
    artists: Artist[];
}

type Track = {
    album: Album;
    artists: Artist[];
    availableMarkets: string[];
    discNumber: number;
    durationMs: number;
    explicit: boolean;
    externalIds: ExternalIds;
    externalUrls: ExternalURLs;
    href: string;
    id: string;
    isPlayable: boolean;
    linkedFrom: any;
    restrictions: Restrictions;
    name: string;
    popularity: number;
    previewUrl: string;
    trackNumber: number;
    type: 'track';
    uri: string;
    isLocal: boolean;
}

type User = {
    country: string;
    displayName: string;
    email: string;
    explicitContent: { filterEnabled: boolean; filterLocked: boolean };
    externalUrls: ExternalURLs;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: 'premium' | 'free' | 'open';
    type: 'user';
    uri: string;
}

type Image = {
    url: string;
    height: number;
    width: number;
}

type ExternalIds = {
    isrc: string;
    ean: string;
    upc: string;
}

type Copyright = {
    text: string;
    type: string;
}

type ExternalURLs = {
    spotify: string;
}

type Restrictions = {
    reason: 'market' | 'product' | 'explicit';
}

type Followers = {
    href: null;
    total: number;
}

export type {
    Artist,
    Album,
    Track,
    User,
    Image,
    ExternalIds,
    Copyright,
    ExternalURLs,
    Restrictions,
    Followers,
}
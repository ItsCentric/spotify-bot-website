type AccessToken = {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
}

type EncryptedContent = {
    iv: Buffer;
    encryptedData: string;
    authTag: Buffer;
}

type TopItems = {
    shortTerm: {
        tracks: SpotifyApi.UsersTopTracksResponse;
        artists: SpotifyApi.UsersTopArtistsResponse;
    }
    mediumTerm: {
        tracks: SpotifyApi.UsersTopTracksResponse;
        artists: SpotifyApi.UsersTopArtistsResponse;
    }
    longTerm: {
        tracks: SpotifyApi.UsersTopTracksResponse;
        artists: SpotifyApi.UsersTopArtistsResponse;
    }
}

type TrackMood = {
    danceability: number,
    energy: number,
    acousticness: number,
    valence: number,
    largest: {
        name: string,
        value: number,
    },
    array: number[],
    total: number,
  }
  type RecentTracksData = {
    tracks: SpotifyApi.PlayHistoryObject[],
    trackFeatures: SpotifyApi.AudioFeaturesObject[],
    tracksMood: TrackMood,
  }

type SpotifyData = {
    topItems: TopItems, 
    userInfo: SpotifyApi.CurrentUsersProfileResponse, 
    recentTracks: RecentTracksData,
}

export type {
    AccessToken,
    EncryptedContent,
    TopItems,
    TrackMood,
    RecentTracksData,
    SpotifyData,
}
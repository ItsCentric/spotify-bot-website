type AccessToken = {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
}

type EncryptedContent = {
    iv: BinaryData;
    content: BinaryData;
}

export type {
    AccessToken,
    EncryptedContent,
}
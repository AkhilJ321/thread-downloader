export type MediaCandidate = {
  height: number;
  width: number;
  url: string;
  type: 'image' | 'video';
};

export interface ThreadsPost<Downloaded extends boolean = false> {
  id: string;
  user: {
    id: string;
    username: string;
    profilePicUrl: string;
    isVerified: boolean;
  };
  metrics: {
    likeCount: number;
    replyString: string;
  };
  thumbnail: string;
  media: {
    caption: string;
    mediaType: 'singleImage' | 'singleVideo' | 'carousel';
    candidates: MediaCandidate[];
  };
  downloaded: Downloaded;
  mediaFilePaths: Downloaded extends true ? string[] : undefined;
  thumbnailFilePath: Downloaded extends true ? string : undefined;
  profilePicFilePath: Downloaded extends true ? string : undefined;
}

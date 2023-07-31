import Realm from 'realm';
import {ThreadsPost} from '../types/ThreadsPost';
import Download from './download';

const UserSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'string',
    username: 'string',
    profilePicUrl: 'string',
    isVerified: 'bool',
  },
};

const MetricsSchema = {
  name: 'Metrics',
  properties: {
    likeCount: 'int',
    replyString: 'string',
  },
};

const MediaCandidateSchema = {
  name: 'MediaCandidate',
  properties: {
    height: 'int',
    width: 'int',
    url: 'string',
    type: 'string',
  },
};

const MediaSchema = {
  name: 'Media',
  properties: {
    caption: 'string',
    mediaType: 'string',
    candidates: 'MediaCandidate[]',
  },
};

const ThreadPostSchema = {
  name: 'ThreadsPost',
  primaryKey: 'id',
  properties: {
    id: 'string',
    user: 'User',
    metrics: 'Metrics',
    media: 'Media',
    downloaded: 'bool',
    mediaFilePaths: 'string[]',
    thumbnailFilePath: 'string',
    profilePicFilePath: 'string',
  },
};

class db {
  static realm: Realm | null = null;

  static async downloadPost(
    post: ThreadsPost<false>,
    progressCallback: (progress: number) => void,
  ) {
    try {
      console.log('\n[db] Downloading post:', post.id);

      const downloadFileRes = await Download.downloadFile(
        post,
        progressCallback,
      );
      if (!downloadFileRes.success) {
        return {
          success: false,
        };
      }
      if (!this.realm) {
        this.realm = await Realm.open({
          schema: [
            ThreadPostSchema,
            UserSchema,
            MetricsSchema,
            MediaSchema,
            MediaCandidateSchema,
          ],
        });
        console.log('[db] Realm opened');
      } else {
        console.log('[db] Realm already opened');
      }
      this.realm.write(() => {
        this.realm?.create('ThreadsPost', {
          ...post,
          downloaded: true,
          mediaFilePaths: downloadFileRes.mediaFilePaths,
          thumbnailFilePath: downloadFileRes.thumbnailFilePath,
          profilePicFilePath: downloadFileRes.profilePicFilePath,
        });
      });
      console.log('[db] Post downloaded', post.id);
    } catch (error) {
      console.error('[db] Error downloading post', error);
    }
  }

  static async getPosts(): Promise<ThreadsPost<true>[]> {
    try {
      if (!this.realm) {
        this.realm = await Realm.open({
          schema: [
            ThreadPostSchema,
            UserSchema,
            MetricsSchema,
            MediaSchema,
            MediaCandidateSchema,
          ],
        });
        console.log('[db] Realm opened');
      } else {
        console.log('[db] Realm already opened');
      }
      const posts = this.realm.objects<ThreadsPost<true>>('ThreadsPost');
      console.log('[db] Total Posts retrieved', posts.length);
      return posts.map(post => post).reverse();
    } catch (error) {
      console.log('[db] Error getting posts', error);
      return [];
    }
  }

  /**
   * Warning: For dev use only
   */
  static async clearDb() {
    try {
      console.log('[db] Clearing db');
      if (!this.realm) {
        this.realm = await Realm.open({
          schema: [
            ThreadPostSchema,
            UserSchema,
            MetricsSchema,
            MediaSchema,
            MediaCandidateSchema,
          ],
        });
        console.log('[db] Realm opened');
      } else {
        console.log('[db] Realm already opened');
      }
      await Download.deleteAllFiles();
      this.realm.write(() => {
        this.realm?.deleteAll();
      });
      console.log('[db] Db cleared');
    } catch (error) {
      console.log('[db] Error clearing db', error);
    }
  }
}

export default db;

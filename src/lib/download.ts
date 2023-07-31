import RNFS from 'react-native-fs';
import {ThreadsPost} from '../types/ThreadsPost';

class Download {
  static async ensureDirectoryExists() {
    try {
      const downloadDirectoryExists = await RNFS.exists(
        RNFS.DownloadDirectoryPath,
      );
      if (!downloadDirectoryExists) {
        await RNFS.mkdir(RNFS.DownloadDirectoryPath);
      }

      const cacheDirExists = await RNFS.exists(RNFS.CachesDirectoryPath);
      if (!cacheDirExists) {
        await RNFS.mkdir(RNFS.CachesDirectoryPath);
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error('[ensureDirectoryExists] error: ', error);
      return {
        success: false,
      };
    }
  }

  static async downloadFile(
    post: ThreadsPost,
    progressCallback: (progress: number) => void,
  ) {
    try {
      await Download.ensureDirectoryExists();

      // 1. download media
      const totalFiles = post.media.candidates.length;
      const mediaDownloadedUrls = [];
      for (let i = 0; i < totalFiles; i++) {
        const mediaNumber = i + 1;
        const mediaCandidate = post.media.candidates[i];
        const mime = mediaCandidate.type === 'image' ? 'jpg' : 'mp4';
        const path = `${RNFS.DownloadDirectoryPath}/${post.id}_${mediaNumber}of${totalFiles}.${mime}`;
        const url = mediaCandidate.url;

        try {
          const {promise} = RNFS.downloadFile({
            fromUrl: url,
            toFile: path,
            progress: res => {
              progressCallback((res.bytesWritten / res.contentLength) * 100);
            },
          });
          await promise;
          mediaDownloadedUrls.push(path);
        } catch (error) {
          console.error(
            `[downloadFile] Media ${i + 1} of ${totalFiles} download failed:`,
            error,
          );
          return {
            success: false,
          };
        }
      }

      // 2. download thumbnail
      const thumbnailPath = `${RNFS.CachesDirectoryPath}/${post.id}_thumbnail.jpg`;
      const thumbnailUrl = post.thumbnail;
      const {promise: thumbnailPromise} = RNFS.downloadFile({
        fromUrl: thumbnailUrl,
        toFile: thumbnailPath,
        progress: res => {
          console.log(
            `[downloadFile] ${post.id}_thumbnail.jpg progress: ${
              (res.bytesWritten / res.contentLength) * 100
            }%`,
          );
        },
      });
      await thumbnailPromise;

      // 3. download user profile pic
      const profilePicPath = `${RNFS.CachesDirectoryPath}/${post.user.id}_profile_pic.jpg`;
      const profilePicUrl = post.user.profilePicUrl;
      const {promise: profilePicPromise} = RNFS.downloadFile({
        fromUrl: profilePicUrl,
        toFile: profilePicPath,
        progress: res => {
          console.log(
            `[downloadFile] ${post.user.id}_profile_pic.jpg progress: ${
              (res.bytesWritten / res.contentLength) * 100
            }%`,
          );
        },
      });
      await profilePicPromise;

      return {
        success: true,
        mediaFilePaths: mediaDownloadedUrls,
        thumbnailFilePath: thumbnailPath,
        profilePicFilePath: profilePicPath,
      };
    } catch (error) {
      console.error('[downloadFile] error: ', error);
      return {
        success: false,
      };
    }
  }

  static async deleteFile(post: ThreadsPost) {
    try {
      console.log('[deleteFile] post: ', post);
      // 1. delete media
      const totalFiles = post.media.candidates.length;
      for (let i = 0; i < totalFiles; i++) {
        const mediaCandidate = post.media.candidates[i];
        const mime = mediaCandidate.type === 'image' ? 'jpg' : 'mp4';
        const path = `${RNFS.DownloadDirectoryPath}/${post.id}_${i}of${totalFiles}.${mime}`;
        await RNFS.unlink(path);
        console.log(`[deleteFile] ${i} of ${totalFiles}`);
      }

      // 2. delete thumbnail
      const thumbnailPath = `${RNFS.CachesDirectoryPath}/${post.id}_thumbnail.jpg`;
      await RNFS.unlink(thumbnailPath);
      console.log('[deleteFile] thumbnail');

      // 3. delete user profile pic
      const profilePicPath = `${RNFS.CachesDirectoryPath}/${post.user.id}_profile_pic.jpg`;
      await RNFS.unlink(profilePicPath);
      console.log('[deleteFile] profile pic');

      return {
        success: true,
      };
    } catch (error) {
      console.error('[deleteFile] error: ', error);
      return {
        success: false,
      };
    }
  }

  static async deleteAllFiles() {
    try {
      await RNFS.unlink(RNFS.DownloadDirectoryPath);
      await RNFS.mkdir(RNFS.CachesDirectoryPath);
      console.log('[deleteAllFiles] success');
      return {
        success: true,
      };
    } catch (error) {
      console.error('[deleteAllFiles] error: ', error);
      return {
        success: false,
      };
    }
  }
}

export default Download;

import RNFS from 'react-native-fs';
import {ThreadsPost} from '../types/ThreadsPost';

class Download {
  static async ensureDirectoryExists() {
    try {
      const exists = await RNFS.exists(RNFS.DownloadDirectoryPath);
      if (!exists) {
        await RNFS.mkdir(RNFS.DocumentDirectoryPath);
        console.log('hello');
      }
      console.log('halo');
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
      const {success} = await Download.ensureDirectoryExists();
      if (!success) {
        console.error('[downloadFile] Failed to create download directory.');
        return {
          success: false,
        };
      }

      // 1. download media
      const totalFiles = post.media.candidates.length;
      for (let i = 0; i < totalFiles; i++) {
        const mediaCandidate = post.media.candidates[i];
        const mime = mediaCandidate.type === 'image' ? 'jpg' : 'mp4';
        const path = `${RNFS.DocumentDirectoryPath}/${post.id}_${i}of${totalFiles}.${mime}`;
        const url = mediaCandidate.url;

        try {
          const {promise} = await RNFS.downloadFile({
            fromUrl: url,
            toFile: path,
            progress: res => {
              progressCallback((res.bytesWritten / res.contentLength) * 100);
            },
          });
          await promise;
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
      const thumbnailPath = `${RNFS.DocumentDirectoryPath}/${post.id}_thumbnail.jpg`;
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
      const profilePicPath = `${RNFS.DocumentDirectoryPath}/${post.user.id}_profile_pic.jpg`;
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
        mediaFilePaths: post.media.candidates.map(
          (mediaCandidate, index) =>
            `${RNFS.DocumentDirectoryPath}/${post.id}_${index}of${totalFiles}.${
              mediaCandidate.type === 'image' ? 'jpg' : 'mp4'
            }`,
        ),
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
      // 1. delete media
      const totalFiles = post.media.candidates.length;
      for (let i = 0; i < totalFiles; i++) {
        const mediaCandidate = post.media.candidates[i];
        const mime = mediaCandidate.type === 'image' ? 'jpg' : 'mp4';
        const path = `${RNFS.DocumentDirectoryPath}/${post.id}_${i}of${totalFiles}.${mime}`;
        await RNFS.unlink(path);
        console.log(`[deleteFile] ${i} of ${totalFiles}`);
      }

      // 2. delete thumbnail
      const thumbnailPath = `${RNFS.DocumentDirectoryPath}/${post.id}_thumbnail.jpg`;
      await RNFS.unlink(thumbnailPath);
      console.log('[deleteFile] thumbnail');

      // 3. delete user profile pic
      const profilePicPath = `${RNFS.DocumentDirectoryPath}/${post.user.id}_profile_pic.jpg`;
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
      await RNFS.unlink(RNFS.DocumentDirectoryPath);
      await RNFS.mkdir(RNFS.DocumentDirectoryPath);
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

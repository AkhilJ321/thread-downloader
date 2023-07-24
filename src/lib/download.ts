import FS from 'react-native-fs';
import {ThreadsPost} from '../types/ThreadsPost';

class Download {
  static async ensureDirectoryExists() {
    try {
      const exists = await FS.exists(FS.DownloadDirectoryPath);
      if (!exists) {
        await FS.mkdir(FS.DownloadDirectoryPath);
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
      for (let i = 0; i < totalFiles; i++) {
        const mediaCandidate = post.media.candidates[i];
        const mime = mediaCandidate.type === 'image' ? 'jpg' : 'mp4';
        const path = `${FS.DownloadDirectoryPath}/${post.id}_${i}of${totalFiles}.${mime}`;
        const url = mediaCandidate.url;
        const {promise} = FS.downloadFile({
          fromUrl: url,
          toFile: path,
          progress: res => {
            progressCallback((res.bytesWritten / res.contentLength) * 100);
          },
        });
        await promise;
      }

      // 2. download thumbnail
      const thumbnailPath = `${FS.DownloadDirectoryPath}/${post.id}_thumbnail.jpg`;
      const thumbnailUrl = post.thumbnail;
      const {promise: thumbnailPromise} = FS.downloadFile({
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
      const profilePicPath = `${FS.DownloadDirectoryPath}/${post.user.id}_profile_pic.jpg`;
      const profilePicUrl = post.user.profilePicUrl;
      const {promise: profilePicPromise} = FS.downloadFile({
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
            `${FS.DownloadDirectoryPath}/${post.id}_${index}of${totalFiles}.${
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
        const path = `${FS.DownloadDirectoryPath}/${post.id}_${i}of${totalFiles}.${mime}`;
        await FS.unlink(path);
        console.log(`[deleteFile] ${i} of ${totalFiles}`);
      }

      // 2. delete thumbnail
      const thumbnailPath = `${FS.DownloadDirectoryPath}/${post.id}_thumbnail.jpg`;
      await FS.unlink(thumbnailPath);
      console.log('[deleteFile] thumbnail');

      // 3. delete user profile pic
      const profilePicPath = `${FS.DownloadDirectoryPath}/${post.user.id}_profile_pic.jpg`;
      await FS.unlink(profilePicPath);
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
      await FS.unlink(FS.DownloadDirectoryPath);
      await FS.mkdir(FS.DownloadDirectoryPath);
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

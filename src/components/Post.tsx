import React from 'react';
import {ThreadsPost} from '../types/ThreadsPost';
import {
  Image,
  Text,
  TouchableNativeFeedback,
  View,
  useColorScheme,
} from 'react-native';
import Share from 'react-native-share';
import PostMedia from './PostMedia';
import {Send, Verified} from '../assets/SvgIcons';
import {PostDarkModeStyles, PostLightModeStyles} from '../assets/styles';

type PostProps = {
  postData: ThreadsPost<any>;
};

const Post: React.FC<PostProps> = (props: PostProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = isDarkMode ? PostDarkModeStyles : PostLightModeStyles;
  // const styles = lightModeStyles;

  async function shareToOtherApps() {
    try {
      if (!props.postData.mediaFilePaths?.length) {
        return;
      }
      await Share.open({
        message: props.postData.media.caption,
        url: 'file://' + props.postData.mediaFilePaths[0],
        title: 'Downloaded from Threads Downloader',
        filename: 'img.jpg',
      });
    } catch (error) {
      console.log('[shareToOtherApps] error', error);
    }
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        {/* User */}
        <View style={styles.userContainer}>
          <Image
            source={{
              uri: props.postData.downloaded
                ? 'file://' + props.postData.profilePicFilePath
                : props.postData.user.profilePicUrl,
            }}
            style={styles.userDp}
          />
          <Text style={styles.username}>{props.postData.user.username}</Text>
          {props.postData.user.isVerified && (
            <Verified height={18} width={18} color={'#458eff'} />
          )}
        </View>
        {props.postData.downloaded && (
          <View>
            <TouchableNativeFeedback
              onPress={() => {
                shareToOtherApps();
              }}>
              <View style={styles.shareButton}>
                <Text
                  style={{
                    color: '#000',
                  }}>
                  Share
                </Text>
                <Send color={'#000'} height={20} width={20} />
              </View>
            </TouchableNativeFeedback>
          </View>
        )}
      </View>
      {/* Caption */}
      <Text style={styles.captionText}>{props.postData.media.caption}</Text>
      {/* Media */}
      <PostMedia
        media={
          props.postData.downloaded && props.postData.mediaFilePaths?.length
            ? {
                caption: props.postData.media.caption,
                mediaType: props.postData.media.mediaType,
                candidates: props.postData.media.candidates.map(
                  (candidate, index) => {
                    return {
                      height: candidate.height,
                      width: candidate.width,
                      type: candidate.type,
                      url:
                        'file://' +
                        (props.postData.mediaFilePaths
                          ? props.postData.mediaFilePaths[index]
                          : props.postData.media.candidates[index].url),
                    };
                  },
                ),
              }
            : props.postData.media
        }
        thumbnail={
          props.postData.downloaded
            ? 'file://' + props.postData.thumbnailFilePath
            : props.postData.thumbnail
        }
      />
      {/* metrics */}
      <View style={styles.metricsContainer}>
        <View>
          <Text style={styles.metricText}>
            {props.postData.metrics.replyString}
          </Text>
        </View>
        <View style={styles.dot} />

        <View>
          <Text style={styles.metricText}>
            {props.postData.metrics.likeCount} Likes
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Post;

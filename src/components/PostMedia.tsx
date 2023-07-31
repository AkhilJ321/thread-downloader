import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Video from 'react-native-video';
import {MediaCandidate} from '../types/ThreadsPost';
import {
  PostMediaLightModeStyles,
  PostMediaDarkModeStyles,
} from '../assets/styles';

type PostMediaProps = {
  media: {
    caption: string;
    mediaType: 'singleImage' | 'singleVideo' | 'carousel';
    candidates: MediaCandidate[];
  };
  thumbnail: string;
};

const PostMedia: React.FC<PostMediaProps> = props => {
  const [videoPaused, setVideoPaused] = React.useState(true);
  const isDarkMode = useColorScheme() === 'dark';

  const styles = isDarkMode
    ? PostMediaDarkModeStyles
    : PostMediaLightModeStyles;
  // const styles = lightModeStyles;
  console.log('[PostMedia] props.media', props.media.candidates[0].url);

  return (
    <View style={styles.container}>
      {props.media.mediaType === 'singleImage' && (
        <Image
          source={{
            uri: props.media.candidates[0].url,
          }}
          style={styles.image}
        />
      )}
      {props.media.mediaType === 'singleVideo' && (
        <View>
          <TouchableOpacity onPress={() => setVideoPaused(!videoPaused)}>
            <Video
              source={{
                uri: props.media.candidates[0].url,
              }}
              style={styles.video}
              resizeMode="contain"
              paused={videoPaused}
              repeat={true}
              poster={props.thumbnail}
            />
          </TouchableOpacity>
        </View>
      )}
      {props.media.mediaType === 'carousel' && (
        <FlatList
          horizontal={true}
          decelerationRate={'fast'}
          snapToAlignment="start"
          snapToInterval={Dimensions.get('screen').width}
          //   ref={ref}
          //   onViewableItemsChanged={onViewRef.current}
          //   viewabilityConfig={viewConfigRef.current}
          scrollEventThrottle={12}
          disableIntervalMomentum
          renderItem={({item}) => (
            <Image
              source={{
                uri: item.url,
              }}
              style={{...styles.image, marginRight: 10, borderRadius: 10}}
            />
          )}
          data={props.media.candidates.filter(
            candidate => candidate.type === 'image',
          )}
        />
      )}
    </View>
  );
};

export default PostMedia;

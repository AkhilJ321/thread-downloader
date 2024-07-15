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
          scrollEventThrottle={12}
          disableIntervalMomentum
          renderItem={({item}) => {
            if (item.type === 'image') {
              return (
                <Image
                  source={{
                    uri: item.url,
                  }}
                  style={{...styles.image, marginRight: 10, borderRadius: 10}}
                />
              );
            } else if (item.type === 'video') {
              return (
                <TouchableOpacity onPress={() => setVideoPaused(!videoPaused)}>
                  <Video
                    source={{
                      uri: item.url,
                    }}
                    style={styles.video}
                    resizeMode="contain"
                    paused={videoPaused}
                    repeat={true}
                    poster={props.thumbnail}
                  />
                </TouchableOpacity>
              );
            }
          }}
          data={props.media.candidates}
          keyExtractor={(item, index) => index.toString()} // You might need to adjust this based on your data structure
        />
      )}
    </View>
  );
};

export default PostMedia;

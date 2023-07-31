import React, {useEffect} from 'react';
import {ScrollView, Text, View, useColorScheme} from 'react-native';
import db from '../lib/db';
import {ThreadsPost} from '../types/ThreadsPost';
import Post from '../components/Post';
import {
  DownloadScreenDarkModeStyles,
  DownloadScreenLightModeStyles,
} from '../assets/styles';

const DownloadsScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = isDarkMode
    ? DownloadScreenDarkModeStyles
    : DownloadScreenLightModeStyles;
  // const styles = lightModeStyles;
  const [threadsPosts, setThreadsPosts] = React.useState<ThreadsPost<true>[]>(
    [],
  );

  async function getDownloadedPostsFromDb() {
    const posts = await db.getPosts();
    console.log('[getDownloadedPostsFromDb] posts', posts);
    setThreadsPosts(posts);
  }

  useEffect(() => {
    getDownloadedPostsFromDb();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>My Downloads</Text>
      {threadsPosts.length === 0 && (
        <Text style={{textAlign: 'center', margin: 20}}>No downloads yet</Text>
      )}
      <View>
        <ScrollView>
          {threadsPosts.map((post, index) => (
            <Post key={index} postData={post} />
          ))}
          <View style={{height: 100}} />
        </ScrollView>
      </View>
    </View>
  );
};

export default DownloadsScreen;

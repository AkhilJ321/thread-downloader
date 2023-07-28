import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View, useColorScheme} from 'react-native';
import db from '../lib/db';
import {ThreadsPost} from '../types/ThreadsPost';
import Post from '../components/Post';

const lightModeStyles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    flex: 1,
    backgroundColor: '#fff',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#301E67',
    margin: 12,
  },
});

const darkModeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 2,
    backgroundColor: '#03001C',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    margin: 12,
  },
});

const DownloadsScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = isDarkMode ? darkModeStyles : lightModeStyles;
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

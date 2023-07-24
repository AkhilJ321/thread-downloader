import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import ThreadsApi from '../lib/threadsApi';
import Post from '../components/Post';
import {ThreadsPost} from '../types/ThreadsPost';
import {getSamplePost} from '../helpers/sampleData';
import db from '../lib/db';

const lightModeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 50,
    flex: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#301E67',
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: '#301E67',
    borderRadius: 50,
    marginHorizontal: 20,
    marginTop: 40,
    padding: 10,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    color: '#301E67',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    margin: 20,
  },
  button: {
    backgroundColor: '#301E67',
    paddingVertical: 15,
    borderRadius: 50,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

const darkModeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#03001C',
    paddingTop: 50,
    flex: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 50,
    marginHorizontal: 20,
    marginTop: 40,
    padding: 10,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#301E67',
    color: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    margin: 20,
  },
  button: {
    backgroundColor: '#301E67',
    paddingVertical: 15,
    borderRadius: 50,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // const styles = isDarkMode ? darkModeStyles : lightModeStyles;
  const styles = lightModeStyles;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [downloadProgressMessage, setDownloadProgressMessage] =
    React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [threadsUrl, setThreadsUrl] = React.useState<string>('');
  const [postData, setPostData] = React.useState<ThreadsPost | null>(null);

  const handleThreadsUrlPaste = async () => {
    const stringFromClipboard = await Clipboard.getString();
    setThreadsUrl(stringFromClipboard);
  };

  const handleThreadsUrlChange = (text: string) => {
    setThreadsUrl(text);
  };

  // db.clearDb();

  async function handleMediaDownload() {
    if (loading) {
      return;
    }
    setLoading(true);
    setError('');
    const res = await ThreadsApi.getMedia(threadsUrl);
    console.log('[handleMediaDownload] res', res);
    if (res.success && res.data) {
      setPostData(res.data);
      await db.downloadPost(res.data, (progress: number) => {
        setDownloadProgressMessage(`${progress.toFixed(0)}%`);
      });
      setDownloadProgressMessage('');
    } else {
      setError('Request Failed. Please try again.');
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Threads Downloader</Text>
      <TextInput
        placeholder="Enter thread url"
        style={styles.textInput}
        value={threadsUrl}
        onChangeText={handleThreadsUrlChange}
        placeholderTextColor={
          !isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
        }
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={{...styles.button}}
          onPress={() => handleThreadsUrlPaste()}>
          <Text style={{...styles.buttonText}}>Paste</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={threadsUrl.length === 0}
          style={{...styles.button}}
          onPress={() => handleMediaDownload()}>
          <Text style={{...styles.buttonText}}>Download</Text>
        </TouchableOpacity>
      </View>

      {downloadProgressMessage && (
        <Text style={{textAlign: 'center'}}>{downloadProgressMessage}</Text>
      )}
      {loading && <Text style={{textAlign: 'center'}}>Loading...</Text>}

      {error && (
        <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
      )}

      <ScrollView>
        {postData && <Post postData={postData} />}

        {/* <Post postData={getSamplePost('image')} /> */}
        <View style={{height: 250}} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

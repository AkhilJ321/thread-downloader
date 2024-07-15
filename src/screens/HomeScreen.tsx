import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import ThreadsApi from '../lib/threadsApi';
import Post from '../components/Post';
import {ThreadsPost} from '../types/ThreadsPost';
// import {getSamplePost} from '../helpers/sampleData';
import db from '../lib/db';
import {darkModeStyles, lightModeStyles} from '../assets/styles';

const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = isDarkMode ? darkModeStyles : lightModeStyles;
  // const styles = lightModeStyles;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [downloadProgressMessage, setDownloadProgressMessage] =
    React.useState<string>('');

  const [threadsUrl, setThreadsUrl] = React.useState<string>('');
  const [postData, setPostData] = React.useState<ThreadsPost | null>(null);

  const handleThreadsUrlPaste = async () => {
    const stringFromClipboard = await Clipboard.getString();
    setThreadsUrl(stringFromClipboard);
  };

  const handleThreadsUrlChange = (text: string) => {
    setThreadsUrl(text);
  };

  async function handleMediaDownload() {
    if (loading) {
      return;
    }

    try {
      if (threadsUrl.startsWith('https://www.threads.net/')) {
        setLoading(true);

        const res = await ThreadsApi.getMedia(threadsUrl);
        // console.log('[handleMediaDownload] res', res);
        if (res.success && res.data) {
          setPostData(res.data);

          const downloadResult = await db.downloadPost(
            res.data,
            (progress: number) => {
              setDownloadProgressMessage(`${progress.toFixed(0)}%`);
            },
          );

          // const jsonDownloadResult = JSON.stringify(downloadResult);

          // const parsedDownloadResult = JSON.parse(jsonDownloadResult);

          if (downloadResult && downloadResult.success === false) {
            ToastAndroid.showWithGravityAndOffset(
              downloadResult.message || 'Download Failed. Please try again.',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          } else {
            // Success toast
            ToastAndroid.showWithGravityAndOffset(
              'Download Successful',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }

          setDownloadProgressMessage('');
        } else {
          console.log('[handleMediaDownload] res', res);
          ToastAndroid.showWithGravityAndOffset(
            res.message || 'Request Failed. Please try again.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
        setLoading(false);
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Invalid URL',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } catch (error) {
      console.log('[handleMediaDownload] error', error);
      setLoading(false);
      return;
    }
  }

  // FOR DEV PURPOSE ONLY
  // db.clearDb();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Threads Downloader</Text>
      <TextInput
        placeholder="Enter thread url"
        style={styles.textInput}
        value={threadsUrl}
        onChangeText={handleThreadsUrlChange}
        placeholderTextColor={
          isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
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

      <ScrollView>
        {postData && <Post postData={postData} />}

        {/* <Post postData={getSamplePost('image')} /> */}
        <View style={{height: 250}} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

import {StyleSheet} from 'react-native';
export const lightModeStyles = StyleSheet.create({
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

export const darkModeStyles = StyleSheet.create({
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

export const BottomBarLightModeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fff',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
});
export const BottomBarDarkModeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#03001C',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    // backgroundColor: '#060404f0f',
  },
});
export const PostLightModeStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    margin: 8,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: '#eee',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDp: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  username: {
    marginLeft: 10,
    marginRight: 2,
    color: '#000',
  },
  captionText: {
    fontSize: 16,
    color: '#000',
    marginVertical: 10,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  metricText: {
    fontSize: 14,
    color: '#000',
    opacity: 0.5,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 50,
    backgroundColor: '#000',
    opacity: 0.5,
  },
});
export const PostDarkModeStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#03001C',
    margin: 8,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDp: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: '#eee',
    color: '#fff',
  },
  username: {
    marginLeft: 10,
    marginRight: 2,
    color: '#fff',
  },
  captionText: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
  },

  metricsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  metricText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.5,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 50,
    backgroundColor: '#fff',
    opacity: 0.5,
  },
});
export const PostMediaLightModeStyles = StyleSheet.create({
  container: {
    paddingVertical: 2,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  video: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
export const PostMediaDarkModeStyles = StyleSheet.create({
  container: {
    paddingVertical: 2,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    borderRadius: 10,
  },
  video: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
export const DownloadScreenLightModeStyles = StyleSheet.create({
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
export const DownloadScreenDarkModeStyles = StyleSheet.create({
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

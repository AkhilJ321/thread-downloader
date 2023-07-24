import {ThreadsPost} from '../types/ThreadsPost';

const sampleImageThreadPost: ThreadsPost = {
  id: '3149538338675198296',
  media: {
    candidates: [
      {
        height: 1400,
        width: 1400,
        url: 'https://scontent.cdninstagram.com/v/t51.2885-15/361349663_6707255309336438_4637599847858421379_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=yG7J-MyW_voAX_s47i6&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE0OTUzODMzODY3NTE5ODI5Ng%3D%3D.2-ccb7-5&oh=00_AfD-I3wi5S0lz2VOwHyUzKgTGpwqZCSAseaLL5lk4FlVKg&oe=64BD06B1&_nc_sid=10d13b',
        type: 'image',
      },
    ],
    caption: 'Similarities between Threads and Adipurush',
    mediaType: 'singleImage',
  },
  metrics: {
    likeCount: 631,
    replyString: '19 replies',
  },
  user: {
    id: '323157379',
    isVerified: false,
    profilePicUrl:
      'https://scontent.cdninstagram.com/v/t51.2885-19/358186313_228922159483522_1830383192550840512_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=AM3mEAoyfhgAX9t-xr7&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBBcGiRk1MZ6oP-gKF63BsZMQp2sLHMhP-hK5Dz0AWUMw&oe=64BD230A&_nc_sid=10d13b',
    username: 'sagarcasm',
  },
};

const sampleVideoThreadPost: ThreadsPost = {
  id: '3149942609904446232',
  media: {
    candidates: [
      {
        height: 346,
        width: 640,
        url: 'https://scontent.cdninstagram.com/v/t50.2886-16/361615841_1286681548603340_4495430183774319396_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=3ZF2gkolDxYAX-MtQiW&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAvbf_vltQE0g8PNg4MOqfCskzjxjJbfgMJr8E-1Uh4aQ&oe=64B9CAEF&_nc_sid=10d13b',
        type: 'video',
      },
    ],
    caption: 'this edit🔥😮‍💨',
    mediaType: 'singleVideo',
  },
  metrics: {
    likeCount: 692,
    replyString: '9 replies',
  },
  user: {
    id: '2423933181',
    isVerified: false,
    profilePicUrl:
      'https://scontent.cdninstagram.com/v/t51.2885-19/358165547_1215549575802520_9153348793891211043_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=6IuC1cxljUAAX8_sQY5&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCdBK5AAxeu3CFr6yd4ryy92-KOcsGjzxOdDAe6EwRXXA&oe=64BC8006&_nc_sid=10d13b',
    username: '86squad',
  },
};

const sampleCarouselThreadPost: ThreadsPost = {
  id: '3150184799543643013',
  media: {
    candidates: [
      {
        height: 1801,
        width: 1440,
        url: 'https://scontent.cdninstagram.com/v/t51.2885-15/361567130_2003937366616328_8034838834218745711_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=IQVw0dJxG5gAX-rnlRR&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE1MDE4NDc5MDk0NTMxODI1MQ%3D%3D.2-ccb7-5&oh=00_AfB7Gu5YY3qzWzy5IX5b_prBSPcWo86uno42WWx9u4qaLw&oe=64BD23DB&_nc_sid=10d13b',
        type: 'image',
      },
      {
        height: 1800,
        width: 1440,
        url: 'https://scontent.cdninstagram.com/v/t51.2885-15/361807549_808854227408599_5400770559342360047_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=3z0agoz-tUcAX8-IjS9&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE1MDE4NDc5MDkzNjg3NjQ4OQ%3D%3D.2-ccb7-5&oh=00_AfDLJHiB_25DG8Rt0_jUafkowm5K5KzwAGygfKRcp2CDcA&oe=64BC2CBD&_nc_sid=10d13b',
        type: 'image',
      },
      {
        height: 1800,
        width: 1440,
        url: 'https://scontent.cdninstagram.com/v/t51.2885-15/361354665_970106464235466_2555194763183542999_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=0ab1zNUJiUAAX_G3XAK&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE1MDE4NDc5MTI2NDA0NTcxMA%3D%3D.2-ccb7-5&oh=00_AfCznw7moz0GU3ifKISZ2x_7KUJ20P6Wwa9Wu6gNIqJbaQ&oe=64BDC044&_nc_sid=10d13b',
        type: 'image',
      },
      {
        height: 1800,
        width: 1440,
        url: 'https://scontent.cdninstagram.com/v/t51.2885-15/361561346_597892569128725_7199602444413419018_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=eBkiS3bwq_gAX_fh3N6&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE1MDE4NDc5MDk0NTM0NzUwNw%3D%3D.2-ccb7-5&oh=00_AfATmgG--hqr0_Dah4TLD8V1yJvJxAoLyjr5BsPpQ4129A&oe=64BCD7FD&_nc_sid=10d13b',
        type: 'image',
      },
      {
        height: 1800,
        width: 1440,
        url: 'https://scontent.cdninstagram.com/v/t51.2885-15/361568151_2201296780064987_5645876165925263321_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&_nc_ohc=2hxYWgD2KdoAX_KS0tk&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE1MDE4NDc5MTI1NTcyNTUwMA%3D%3D.2-ccb7-5&oh=00_AfBDS1yjWVjD5atk2LSpa-m7sF3TrA_k4XlcOQusPJZ4qQ&oe=64BCC537&_nc_sid=10d13b',
        type: 'image',
      },
    ],
    caption: 'The face of midnight munchies 😉😉😉',
    mediaType: 'carousel',
  },
  metrics: {
    likeCount: 5269,
    replyString: '197 replies',
  },
  user: {
    id: '1060870984',
    isVerified: true,
    profilePicUrl:
      'https://scontent.cdninstagram.com/v/t51.2885-19/358033008_1230979560928564_2406071228675648674_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=gAm-PfWclXcAX-Yjwm9&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBGPHwes4jEf6SjoEgYVilmgLKEF71fU9Wo7xxAZQD3nQ&oe=64BC7F75&_nc_sid=10d13b',
    username: 'tamannaahspeaks',
  },
};

export function getSamplePost(type: 'image' | 'video' | 'carousel' = 'image') {
  if (type === 'image') {
    return sampleImageThreadPost;
  } else if (type === 'video') {
    return sampleVideoThreadPost;
  } else if (type === 'carousel') {
    return sampleCarouselThreadPost;
  }

  return sampleImageThreadPost;
}

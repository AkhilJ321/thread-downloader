import {ThreadsPost} from '../types/ThreadsPost';

export function transformThreadsPost(post: Record<string, any>): ThreadsPost {
  const data = post.data;

  const mediaType = data.containing_thread.thread_items[0].post.carousel_media
    ? 'carousel'
    : data.containing_thread.thread_items[0].post?.video_versions.length > 0
    ? 'singleVideo'
    : 'singleImage';

  return {
    id: data.containing_thread.thread_items[0].post.pk,
    media: {
      candidates:
        // if carousel
        mediaType === 'carousel'
          ? data.containing_thread.thread_items[0].post.carousel_media.map(
              (candidate: Record<string, any>) => ({
                height: candidate.original_height,
                width: candidate.original_width,
                url: candidate.image_versions2.candidates[0].url,
                type: candidate?.video_versions.length > 0 ? 'video' : 'image',
              }),
            )
          : // if singleVideo
          mediaType === 'singleVideo'
          ? [
              {
                height:
                  data.containing_thread.thread_items[0].post.original_height,
                width:
                  data.containing_thread.thread_items[0].post.original_width,
                url: data.containing_thread.thread_items[0].post
                  .video_versions[0].url,
                type: 'video',
              },
            ]
          : // if singleImage
            [
              {
                height:
                  data.containing_thread.thread_items[0].post.original_height,
                width:
                  data.containing_thread.thread_items[0].post.original_width,
                url: data.containing_thread.thread_items[0].post.image_versions2
                  .candidates[0].url,
                type: 'image',
              },
            ],

      caption: data.containing_thread.thread_items[0].post?.caption?.text || '',
      mediaType,
    },
    thumbnail:
      data.containing_thread.thread_items[0].post.image_versions2.candidates[0]
        .url,
    metrics: {
      likeCount: data.containing_thread.thread_items[0].post?.like_count || 0,
      replyString:
        data.containing_thread.thread_items[0]?.view_replies_cta_string || '',
    },
    user: {
      id: data.containing_thread.thread_items[0].post.user.pk,
      isVerified: data.containing_thread.thread_items[0].post.user.is_verified,
      profilePicUrl:
        data.containing_thread.thread_items[0].post.user.profile_pic_url,
      username: data.containing_thread.thread_items[0].post.user.username,
    },
  };
}

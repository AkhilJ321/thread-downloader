export async function handleDownloadMedia(threadsUrl: string) {
  try {
    const res = await fetch('https://threadstap.com/?ref=producthunt', {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'cache-control': 'max-age=0',
        'content-type': 'application/x-www-form-urlencoded',
        'sec-ch-ua':
          '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
      referrer: 'https://threadstap.com/?ref=producthunt',
      // @ts-ignore
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: `url=${encodeURIComponent(threadsUrl)}`,
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });

    const data = await res.text();

    if (res.status === 200) {
      const url =
        'https://scontent' +
        data.split('href="https://scontent')[1].split('"')[0];
      console.log(url);
    } else {
      console.log('[ERROR] ', data);
    }
  } catch (error) {
    console.log('[ERROR] ', error);
  }
}

import { useEffect, useState } from "react";

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
}

function parseISO8601Duration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match?.[1] || "0", 10);
  const minutes = parseInt(match?.[2] || "0", 10);
  const seconds = parseInt(match?.[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

export function useYouTubeVideos(maxPages = 5) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      setError("Missing YouTube API credentials.");
      return;
    }

    async function fetchAllVideos() {
      let nextPageToken = "";
      let allVideoIds: string[] = [];
      let page = 0;

      try {
        while (page < maxPages) {
          const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=id&order=date&maxResults=50&type=video&pageToken=${nextPageToken}`;
          const res = await fetch(searchUrl);
          const data = await res.json();

          if (data.error) throw new Error(data.error.message);

          const ids = data.items
            .filter((item: any) => item.id.kind === "youtube#video")
            .map((item: any) => item.id.videoId);

          allVideoIds.push(...ids);

          if (!data.nextPageToken) break;

          nextPageToken = data.nextPageToken;
          page++;
        }

        // Fetch video details in batches of 50
        const videoDetails: YouTubeVideo[] = [];
        const batchSize = 50;

        for (let i = 0; i < allVideoIds.length; i += batchSize) {
          const batchIds = allVideoIds.slice(i, i + batchSize).join(",");
          const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${batchIds}&part=snippet,contentDetails`;
          const res = await fetch(detailsUrl);
          const details = await res.json();

          if (details.error) throw new Error(details.error.message);

          const batchVideos = details.items
            .map((video: any) => {
              const duration = video.contentDetails.duration;
              const durationInSeconds = parseISO8601Duration(duration);
              return durationInSeconds >= 60
                ? {
                    id: video.id,
                    title: video.snippet.title,
                    thumbnail: video.snippet.thumbnails.medium.url,
                    duration,
                  }
                : null;
            })
            .filter(Boolean) as YouTubeVideo[];

          videoDetails.push(...batchVideos);
        }

        setVideos(videoDetails);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchAllVideos();
  }, []);

  return { videos, error, loading };
}

import React, { useState, useEffect } from 'react';
import { Youtube, Facebook, Twitter, Instagram, Video as VideoIcon } from 'lucide-react';

interface VideoInfo {
  platform: 'youtube' | 'vimeo' | 'facebook' | 'twitter' | 'instagram' | 'local' | 'other';
  thumbnailUrl?: string;
  title?: string;
  author?: string;
}

const VideoPreview = ({ url }: { url: string }) => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      setIsLoading(true);
      
      // Video local (empieza con /src/assets/ o /public/uploads/)
      if (url.startsWith('/src/assets/') || url.startsWith('/public/uploads/')) {
        setVideoInfo({
          platform: 'local',
          title: 'Video Local',
        });
        setIsLoading(false);
        return;
      }
      
      // YouTube
      let match = url.match(/^.*(youtu.be\/|v\/|u\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
      if (match && match[2].length === 11) {
        const videoId = match[2];
        setVideoInfo({
          platform: 'youtube',
          thumbnailUrl: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          title: 'Video de YouTube',
        });
        setIsLoading(false);
        return;
      }

      // Vimeo
      match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (match && match[1]) {
        try {
          const response = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`);
          const data = await response.json();
          setVideoInfo({
            platform: 'vimeo',
            thumbnailUrl: data.thumbnail_url,
            title: data.title,
            author: data.author_name,
          });
        } catch (error) {
          console.error("Error fetching Vimeo data", error);
          setVideoInfo({ platform: 'vimeo', title: url }); // Fallback
        }
        setIsLoading(false);
        return;
      }
      
      // Facebook
      if (url.includes('facebook.com') || url.includes('fb.watch')) {
        setVideoInfo({ platform: 'facebook', title: 'Video de Facebook' });
        setIsLoading(false);
        return;
      }
      
      // Instagram
      if (url.includes('instagram.com')) {
        setVideoInfo({ platform: 'instagram', title: 'Publicación de Instagram' });
        setIsLoading(false);
        return;
      }

      // Twitter / X
      if (url.includes('twitter.com') || url.includes('x.com')) {
        setVideoInfo({ platform: 'twitter', title: 'Video de X/Twitter' });
        setIsLoading(false);
        return;
      }

      // Other
      setVideoInfo({ platform: 'other', title: url });
      setIsLoading(false);
    };

    if(url) fetchVideoInfo();
    else setIsLoading(false);
  }, [url]);

  const renderIcon = (size: number = 12) => {
    switch (videoInfo?.platform) {
      case 'youtube': return <Youtube className="text-red-600" style={{ width: size, height: size }} />;
      case 'vimeo': return <VideoIcon className="text-blue-500" style={{ width: size, height: size }} />;
      case 'facebook': return <Facebook className="text-blue-700" style={{ width: size, height: size }} />;
      case 'instagram': return <Instagram className="text-pink-600" style={{ width: size, height: size }} />;
      case 'twitter': return <Twitter className="text-blue-400" style={{ width: size, height: size }} />;
      case 'local': return <VideoIcon className="text-green-600" style={{ width: size, height: size }} />;
      default: return <VideoIcon className="text-gray-500" style={{ width: size, height: size }} />;
    }
  };

  if (isLoading) {
    return <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>;
  }
  
  if (!url) return null;

  return (
    <div className="block rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
      <div className="relative">
        {videoInfo?.platform === 'local' ? (
          // Reproductor de video local con autoplay y loop
          <video
            src={url}
            poster=""
            className="w-full object-cover aspect-video"
            controls
            loop
            autoPlay
            muted
            preload="metadata"
          />
        ) : videoInfo?.thumbnailUrl ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={videoInfo.thumbnailUrl} alt={videoInfo.title || 'Video thumbnail'} className="w-full object-cover aspect-video" />
            <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full">
              {renderIcon(20)}
            </div>
          </a>
        ) : (
          <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
            {renderIcon(48)}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold truncate text-sm text-gray-800">{videoInfo?.title || url}</h3>
        {videoInfo?.author && <p className="text-xs text-gray-600 truncate">de {videoInfo.author}</p>}
      </div>
    </div>
  );
};

export default VideoPreview;

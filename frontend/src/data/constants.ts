import { FaCode, FaMusic, FaImage } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Music Generation',
    icon: FaMusic,
    href: '/music-generate',
    color: "music-color",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Image Generation',
    icon: FaImage,
    href: '/image-generate',
    color: "image-color",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Video Generation',
    icon: RxVideo,
    href: '/video-generate',
    color: "video-color",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Code Generation',
    icon: FaCode,
    href: '/code-generate',
    color: "code-color",
    bgColor: "bg-violet-500/10",
  },
];
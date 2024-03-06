import { FaCode, FaMusic, FaImage } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Music Generation',
    icon: FaMusic,
    href: '/music-generate',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Image Generation',
    icon: FaImage,
    href: '/image-generate',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Video Generation',
    icon: RxVideo,
    href: '/video-generate',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Code Generation',
    icon: FaCode,
    href: '/code-generate',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
];
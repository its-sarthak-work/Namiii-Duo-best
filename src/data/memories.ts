/**
 * ✏️ EDIT YOUR MEMORIES HERE
 *
 * Put image files in: public/memories/
 * Put video files in: public/videos/
 *
 * These paths are served from the public folder, so do not import them.
 * Keep the filenames below, or update `src` to match your actual filenames.
 */
export type MemoryCategory =
  | "Gaming Moments"
  | "Funny Screenshots"
  | "Random Conversations"
  | "Best Matches"
  | "Unforgettable Moments";

export type Memory = {
  id: number;
  category: MemoryCategory;
  caption: string;
  sticker: string;
  type: "image" | "video";
  src: string;
};

export const categories: MemoryCategory[] = [
  "Gaming Moments",
  "Funny Screenshots",
  "Random Conversations",
  "Best Matches",
  "Unforgettable Moments",
];

export const memories: Memory[] = [
  { id: 1, category: "Gaming Moments", caption: "the first match we ever played 🎮", sticker: "🎀", type: "image", src: "/memories/memory-1.jpg" },
  { id: 2, category: "Gaming Moments", caption: "us vs the entire lobby lol", sticker: "⭐", type: "image", src: "/memories/memory-2.jpg" },
  { id: 3, category: "Funny Screenshots", caption: "why did we even do this 😭", sticker: "🐾", type: "image", src: "/memories/memory-3.jpg" },
  { id: 4, category: "Funny Screenshots", caption: "peak chaos, no regrets", sticker: "💥", type: "video", src: "/videos/memory-4.mp4" },
  { id: 5, category: "Random Conversations", caption: "3am talks about literally nothing", sticker: "🌙", type: "image", src: "/memories/memory-5.jpg" },
  { id: 6, category: "Random Conversations", caption: "the inside joke nobody else gets", sticker: "🤭", type: "video", src: "/videos/memory-6.mp4" },
  { id: 7, category: "Best Matches", caption: "that clutch. THAT CLUTCH.", sticker: "🏆", type: "video", src: "/videos/memory-7.mp4" },
  { id: 8, category: "Best Matches", caption: "unbeatable duo energy", sticker: "✨", type: "image", src: "/memories/memory-8.jpg" },
  { id: 9, category: "Unforgettable Moments", caption: "Flexing Your skills and Beautiful Nails", sticker: "🌸", type: "video", src: "/videos/memory-9.mp4" },
];

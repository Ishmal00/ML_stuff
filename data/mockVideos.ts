
import { MemoryVideo } from '../types';

export const MOCK_VIDEOS: MemoryVideo[] = [
  {
    id: 'v1',
    title: 'Rainy Day Cooking Disaster',
    thumbnailUrl: 'https://picsum.photos/seed/cooking/400/225',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    timestamp: '2023-11-12',
    description: 'Tried making a three-tier cake. The kitchen was a mess, it rained outside, and the bottom layer collapsed.',
    transcript: "Oh no, look at the flour everywhere! It's pouring outside and I think I forgot the baking powder. This is a total disaster, haha. Look at that sink...",
    inferredEmotions: ['frustration', 'amusement', 'chaos', 'coziness'],
    keyActions: ['baking', 'laughing', 'cleaning', 'pointing at mess']
  },
  {
    id: 'v2',
    title: 'Golden Hour at the Pier',
    thumbnailUrl: 'https://picsum.photos/seed/sunset/400/225',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    timestamp: '2024-02-15',
    description: 'A quiet evening walk. Long shadows, cold wind but beautiful orange sky.',
    transcript: "It's so quiet here. The wind is freezing though. Look at the way the light hits the water. Just breathe.",
    inferredEmotions: ['serenity', 'loneliness', 'awe', 'peace'],
    keyActions: ['walking', 'breathing', 'filming horizon']
  },
  {
    id: 'v3',
    title: 'Final Mile of the Marathon',
    thumbnailUrl: 'https://picsum.photos/seed/marathon/400/225',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    timestamp: '2023-10-05',
    description: 'Exhausted but pushing through the final stretch. People cheering loudly.',
    transcript: "Legs are like lead. Almost there. Can see the finish line. Crowd is so loud. One more step. One more step.",
    inferredEmotions: ['exhaustion', 'determination', 'pride', 'pain'],
    keyActions: ['running', 'panting', 'clinching fists', 'crossing line']
  },
  {
    id: 'v4',
    title: 'Surprise Puppy Reveal',
    thumbnailUrl: 'https://picsum.photos/seed/puppy/400/225',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    timestamp: '2023-12-25',
    description: 'Opening a box to find a tiny Golden Retriever. Lots of screaming and crying.',
    transcript: "Is it a... Oh my god! No way! He's so small! Look at his paws! I'm crying, I actually can't believe this.",
    inferredEmotions: ['joy', 'shock', 'love', 'hysteria'],
    keyActions: ['unboxing', 'crying', 'hugging puppy', 'screaming']
  },
  {
    id: 'v5',
    title: 'Late Night Library Session',
    thumbnailUrl: 'https://picsum.photos/seed/study/400/225',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    timestamp: '2024-05-20',
    description: 'Studying for finals at 3 AM. Coffee cups stacked up.',
    transcript: "Three more chapters. My eyes are burning. Everyone else is asleep. Just me and this textbook.",
    inferredEmotions: ['stress', 'fatigue', 'focus', 'quiet'],
    keyActions: ['writing', 'sipping coffee', 'turning pages', 'yawning']
  }
];

export const userSeeds = [
  {
    username: "starloam",
    avatarUrl: "https://i.pravatar.cc/300?img=48",
  },
  {
    username: "nullvoid",
    avatarUrl: "https://i.pravatar.cc/300?img=13",
  },
] as const;

type Username = (typeof userSeeds)[number]["username"];

export const postSeeds = new Map<Username, string[]>([
  [
    "starloam",
    [
      "spent the morning watching fog roll over the hills and thinking about nothing in particular. sometimes that's exactly what the brain needs.",
      "made coffee, opened my editor, stared at an empty file for 20 minutes, and then had my best idea of the month. the blank page is underrated.",
      "the internet used to feel like a place you visited. now it feels like a place you live. not sure how i feel about that.",
      "wrote something i actually liked today. didn't post it. some things are better just for you.",
    ],
  ],
  [
    "nullvoid",
    [
      "traced a bug for three hours. it was a missing semicolon. i'm fine.",
      "hot take: the best code you'll ever write is the code you delete. pulled 400 lines today and everything got faster.",
      "your ORM is fine actually. the problem is you don't understand what SQL it's generating. read the logs.",
      "convinced myself i didn't need tests. spent four hours debugging a function that a single test would have caught in 0.3 seconds. lesson learned.",
    ],
  ],
]);

import { IComment, IPost, IUser } from "../types";

export const Users: IUser[] = [
  { id: 10, name: "Sachin", email: "sachin@gmail.com" },
  { id: 12, name: "Anjali", email: "anjali.sharma@outlook.com" },
  { id: 13, name: "Arjun", email: "arjun.v@yahoo.com" },
  { id: 14, name: "Priya", email: "priya.nair@gmail.com" },
  { id: 15, name: "Rohan", email: "rohan.mehta@protonmail.com" },
  { id: 16, name: "Ishani", email: "ishani24@icloud.com" },
  { id: 17, name: "Vikram", email: "v.rathore@company.com" },
  { id: 18, name: "Meera", email: "meera.patel@live.com" },
  { id: 19, name: "Kabir", email: "kabir.singh@gmail.com" },
  { id: 11, name: "Sana", email: "sana.khan@webmail.com" },
];

export const Posts: IPost[] = [
  {
    id: 1,
    author: "Sachin",
    authorId: 10, // Matches Sachin (ID 10)
    title: "My Bio",
    content: "This is about my self and my journey into web development.",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-01T10:00:00Z",
  },
  {
    id: 2,
    author: "Anjali",
    authorId: 12, // Fixed: Matches Anjali (ID 12)
    title: "The Future of AI",
    content: "Artificial Intelligence is transforming how we write code daily.",
    createdAt: "2025-01-05T14:30:00Z",
    updatedAt: "2025-01-06T09:15:00Z",
  },
  {
    id: 3,
    author: "Vikram Rathore",
    authorId: 17, // Fixed: Matches Vikram (ID 17)
    title: "Next.js 15 Tips",
    content: "Server components are the backbone of modern React applications.",
    createdAt: "2025-01-10T08:00:00Z",
    updatedAt: "2025-01-10T08:00:00Z",
  },
  {
    id: 4,
    author: "Priya Nair",
    authorId: 14, // Matches Priya (ID 14)
    title: "Travel Diaries",
    content: "Exploring the hidden gems of Kerala during the monsoon season.",
    createdAt: "2025-01-15T12:00:00Z",
    updatedAt: "2025-01-15T12:00:00Z",
  },
  {
    id: 5,
    author: "Rohan Mehta",
    authorId: 15, // Fixed: Matches Rohan (ID 15)
    title: "Mastering Tailwind",
    content:
      "Utility-first CSS is the fastest way to build beautiful interfaces.",
    createdAt: "2025-01-20T16:45:00Z",
    updatedAt: "2025-01-21T10:30:00Z",
  },
  {
    id: 6,
    author: "Sachin",
    authorId: 10, // Matches Sachin (ID 10)
    title: "My Second Post",
    content:
      "Continuing my journey, today I learned about Prisma and Databases.",
    createdAt: "2025-01-25T09:00:00Z",
    updatedAt: "2025-01-25T09:00:00Z",
  },
  {
    id: 7,
    author: "Ishani Das",
    authorId: 16, // Fixed: Matches Ishani (ID 16)
    title: "Healthy Living",
    content:
      "Five simple habits to improve your physical and mental well-being.",
    createdAt: "2025-02-01T07:15:00Z",
    updatedAt: "2025-02-01T07:15:00Z",
  },
  {
    id: 8,
    author: "Kabir Singh",
    authorId: 19, // Fixed: Matches Kabir (ID 19)
    title: "The Art of Coffee",
    content: "Understanding the difference between Arabica and Robusta beans.",
    createdAt: "2025-02-05T11:20:00Z",
    updatedAt: "2025-02-05T11:20:00Z",
  },
  {
    id: 9,
    author: "Sana Khan",
    authorId: 11, // Fixed: Matches Sana (ID 11)
    title: "TypeScript Secrets",
    content: "Generics and Interfaces can make your code much more robust.",
    createdAt: "2025-02-10T15:00:00Z",
    updatedAt: "2025-02-12T08:45:00Z",
  },
  {
    id: 10,
    author: "Arjun V",
    authorId: 13, // Fixed: Matches Arjun (ID 13)
    title: "Gaming Trends 2026",
    content: "Why cloud gaming is finally becoming the industry standard.",
    createdAt: "2025-02-15T20:30:00Z",
    updatedAt: "2025-02-15T20:30:00Z",
  },
];

export const Comment: IComment[] = [
  {
    id: 1,
    authorId: 10,
    content: "This is Sachin's first comment on the intro post!",
    postId: 1,
    createdAt: "2025-01-01T10:05:00Z",
  },
  {
    id: 2,
    authorId: 11,
    content: "Great insights on the Future of AI. Thanks for sharing, Anjali!",
    postId: 2,
    createdAt: "2025-01-05T15:20:00Z",
  },
  {
    id: 3,
    authorId: 12,
    content:
      "I'm having some trouble with the Next.js 15 installation. Any tips?",
    postId: 3,
    createdAt: "2025-01-10T09:45:00Z",
  },
  {
    id: 4,
    authorId: 10,
    content: "Kerala looks absolutely beautiful in these monsoon photos.",
    postId: 4,
    createdAt: "2025-01-15T13:10:00Z",
  },
  {
    id: 5,
    authorId: 14,
    content: "Tailwind has completely changed my workflow. No more CSS files!",
    postId: 5,
    createdAt: "2025-01-21T11:00:00Z",
  },
  {
    id: 6,
    authorId: 13,
    content: "Does this support dark mode out of the box?",
    postId: 5,
    createdAt: "2025-01-22T14:30:00Z",
  },
  {
    id: 7,
    authorId: 11,
    content:
      "I tried the morning habits you suggested, Ishani. Feeling much better!",
    postId: 7,
    createdAt: "2025-02-02T08:00:00Z",
  },
  {
    id: 8,
    authorId: 15,
    content:
      "Wait, what's the difference between a flat white and a latte again?",
    postId: 8,
    createdAt: "2025-02-06T12:15:00Z",
  },
  {
    id: 9,
    authorId: 10,
    content: "Is cloud gaming actually lag-free in 2026? I'm still skeptical.",
    postId: 10,
    createdAt: "2025-02-16T21:40:00Z",
  },
  {
    id: 10,
    authorId: 17,
    content:
      "TypeScript interfaces are definitely the way to go for larger teams.",
    postId: 9,
    createdAt: "2025-02-12T10:05:00Z",
  },
];

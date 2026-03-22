import { NextResponse } from "next/server";

import { Comments, Posts, Users } from "../../../data/mockData";
import { Averia_Libre } from "next/font/google";

export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
  const { searcharams } = new URL(request.url);
  const authorId = searcharams.get("authorId");
  const search = searcharams.get("search");
  const sortBy = searcharams.get("sortBy");
  const order = searcharams.get("order");
  const page = searcharams.get("page");
  const limit = searcharams.get("limit");
  let filteredPosts = Posts;
  if (authorId) {
    const parsedAuthorId = parseInt(authorId);
    if (!isNaN(parsedAuthorId)) {
      filteredPosts = filteredPosts.filter(
        (p) => p.authorId === parsedAuthorId,
      );
    }
  }
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (p) =>
        p.title.toLocaleLowerCase().includes(searchTerm) ||
        p.content.toLowerCase().includes(searchTerm),
    );
  }
  const postWithAuthors = Posts.map((post) => ({
    ...post,
    author: Users.find((user) => user.id === post.authorId),
  }));

  const postWithDetails = filteredPosts.map((p) => ({
    ...p,
    author: Users.find((user) => user.id === p.authorId),
    comment_count: Comments.filter((c) => c.postId === p.id),
    excerpts: p.content.slice(0, 150) + "...",
  }));

  const sortedPost = postWithDetails.sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case "title":
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case "author":
        aValue = a.author?.name.toLowerCase();
        bValue = b.author?.name.toLowerCase();
        break;
      case "commentCount":
        aValue = a.comment_count;
        bValue = b.comment_count;
        break;
      default:
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
    }
    if (order === "asc") {
      return aValue > bValue ? 1 : -1;
    }
  });
  return NextResponse.json(postWithAuthors);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newPost = {
    id: Posts.length + 1,
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString,
  };
  Posts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
}

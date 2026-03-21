import { NextResponse } from "next/server";

import { Posts, Users } from "../../../data/mockData";

export async function GET() {
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));

  const postWithAuthors = Posts.map((post) => ({
    ...post,
    author: Users.find((user) => user.id === post.authorId),
  }));
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

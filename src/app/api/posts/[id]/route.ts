import { Posts, Users } from "@/src/data/mockData";
import { NextResponse } from "next/server";

interface IParam {
  params: { id: string };
}
export async function GET(request: Request, { params }: IParam) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const { id } = await params;

  const postId = parseInt(id);
  const post = Posts.find((p) => p.id === postId);
  if (!post) {
    return NextResponse.json({ error: "post not found" }, { status: 404 });
  }
  const postWithAuthor = {
    ...post,
    author: Users.find((p) => p.id === post?.authorId),
  };
  return NextResponse.json(postWithAuthor, { status: 201 });
}

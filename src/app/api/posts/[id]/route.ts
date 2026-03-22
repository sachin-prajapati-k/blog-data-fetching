import { Comments, Posts, Users } from "@/src/data/mockData";
import { NEXT_REWRITTEN_PATH_HEADER } from "next/dist/client/components/app-router-headers";
import { NextResponse } from "next/server";

interface IParam {
  params: { id: string };
}
export async function GET(request: Request, { params }: IParam) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const { id } = await params;

  const postId = parseInt(id);
  if (isNaN(postId)) {
    return NextResponse.json({ error: "post id is invalid" }, { status: 400 });
  }
  const post = Posts.find((p) => p.id === postId);
  if (!post) {
    return NextResponse.json({ error: "post not found" }, { status: 404 });
  }
  const author = Users.find((u) => u.id === post.authorId);
  const postComments = Comments.filter((c) => c.postId === postId).map(
    (comment) => ({
      ...Comments,
      author: Users.find((u) => u.id === comment.authorId),
    }),
  );

  const postWithAuthor = {
    ...post,
    author: Users.find((p) => p.id === post?.authorId),
  };
  const fullPost = {
    ...post,
    author,
    comments: postComments,
    stats: {
      commentCount: postComments.length,
      wordCount: post.content.split(" ").length,
      readingTime: Math.ceil(post.content.split(" ").length / 200),
    },
  };

  return NextResponse.json(fullPost, { status: 201 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: "postid is not valid" },
        { status: 400 },
      );
    }
    const postIndex = Posts.findIndex((p) => p.id === postId);
    if (postIndex === -1) {
      return NextResponse.json({ error: "post not found" }, { status: 400 });
    }
    const body = await request.json();
    const updatedPost = {
      ...Posts[postIndex],
      ...body,
      id: postId,
      updatedAt: new Date().toISOString(),
    };
    Posts[postIndex] = updatedPost;
    const author = Users.find((u) => u.id === updatedPost.authorId);
    return NextResponse.json({ ...updatedPost, author });
  } catch (error) {
    return NextResponse.json({ error: "invalid json data" }, { status: 409 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const postID = parseInt(id);

  if (isNaN(postID)) {
    return NextResponse.json({ error: "post id is invalid" }, { status: 400 });
  }
  const postIndex = Posts.findIndex((p) => p.id === postID);
  if (postIndex === -1) {
    return NextResponse.json({ error: "post is not found" }, { status: 400 });
  }
  const deletedPost = Posts.splice(postIndex, 1)[0];
  const deletedComments = Comments.filter((c) => c.postId === postID);
  for (let i = Comments.length - 1; i >= 0; i--) {
    if (Comments[i].postId === postID) {
      Comments.splice(i, 1);
    }
  }
  return NextResponse.json({
    message: "post and assiciated post are deleted successfully",
    deletedPost: deletedPost,
    deletedComments: deletedComments.length,
  });
}

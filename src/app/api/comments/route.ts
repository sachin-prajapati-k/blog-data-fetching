import { Comments, Posts, Users } from "@/src/data/mockData";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await new Promise((resolve) => setInterval(resolve, 1000));
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");
  const postId = searchParams.get("postId");
  const limit = searchParams.get("limit");
  let filteredComments = Comments;
  if (authorId) {
    const parsedAuthorId = parseInt(authorId);
    filteredComments = filteredComments.filter(
      (c) => c.authorId === parsedAuthorId,
    );
  }
  if (postId) {
    const parsedPostId = parseInt(postId);
    if (postId) {
      filteredComments = filteredComments.filter(
        (c) => c.postId === parsedPostId,
      );
    }
  }
  const commentWithDetails = filteredComments.map((comment) => ({
    ...comment,
    author: Users.find((u) => u.id === comment.authorId),
    post: Posts.find((p) => p.id === comment.postId),
  }));
  const sortedComments = commentWithDetails.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  let result = sortedComments;
  if (limit) {
    const parsedLimit = parseInt(limit);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      result = sortedComments.slice(0, parsedLimit);
    }
  }
  return NextResponse.json(
    {
      total: filteredComments.length,
      showing: result.length,
      comments: result,
    },
    { status: 201 },
  );
}

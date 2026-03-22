import { Comments, Posts, Users } from "@/src/data/mockData";
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
try{
  const {id}=await params;
  const postId=parseInt(id);
  if(isNaN(postId)){
    return NextResponse.json({error:'postid is not valid'},{status:400})
  }
  const postIndex=
}

}

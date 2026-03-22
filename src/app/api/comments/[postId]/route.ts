import { Comments, Posts, Users } from "@/src/data/mockData";
import { IParams } from "@/src/types";
import { NextRequest, NextResponse } from "next/server";
import { resolve } from "path";

export async function GET(
  request: Request,
  { params }: { params: { postId: string } },
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { postId } = await params;
  const postID = parseInt(postId);

  if (isNaN(postID)) {
    return NextResponse.json({ error: "post is not valid" }, { status: 404 });
  }
  const post = Posts.find((p) => p.id === postID);
  if (!post) {
    return NextResponse.json(
      { error: "Post id is not exists" },
      { status: 409 },
    );
  }
  const postComment = Comments.filter((c) => c.postId === postID)
    .map((c) => ({
      ...c,
      author: Users.find((u) => u.id === post.authorId),
    }))
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  return NextResponse.json(
    {
      postID,
      post_title: post.title,
      total_post: postComment.length,
      comments: postComment,
    },
    { status: 201 },
  );
}


export async function POST(request:Request,{params}:{params:{postId:string}}) {
    try{
        const {postId}=await params;
        const postID=parseInt(postId);
        if(isNaN(postID)){
            return NextResponse.json({error:'invalid post id'},{status:404})
        }
        const post =Posts.find(p=>p.id===postID)
        if(!post){
            return NextResponse.json({error:'post not found'},{status:409})
        }
        const newPost={
            id:Posts.length+1,
            
        }
    }
    
}
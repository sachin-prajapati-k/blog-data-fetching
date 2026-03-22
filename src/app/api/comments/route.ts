import { Comments } from "@/src/data/mockData";
import { Parisienne } from "next/font/google";

export async function GET(request: Request) {
  await new Promise((resolve) => setInterval(resolve, 1000));
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");
  const postId = searchParams.get("postId");
  const limit = searchParams.get("limit");
  let filteredComments = Comments;
  if (authorId) {
    const parsedAuthorId = parseInt(authorId);
    const filteredComments = filteredComments.filter(
      (c) => c.authorId === parsedAuthorId,
    );
  }
  if(postId){
    
  }
}

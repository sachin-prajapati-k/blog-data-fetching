import { resolve } from "path";
import { Users, Posts } from "@/src/data/mockData";
import { NextResponse } from "next/server";
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const userWithPost = Users.map((u) => ({
    ...u,
    post: Posts.find((p) => p.authorId === u.id),
  }));
  return NextResponse.json(userWithPost);
}


export async function POST(request:Request) {
    
    
}
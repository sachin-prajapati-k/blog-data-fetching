
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

export async function POST(request: Request) {
  const body = await request.json();
  try {
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "email and name are required" },
        { status: 400 },
      );
    }
    const existingUser = Users.find((u) => u.email === body.email);
    if (existingUser) {
      return NextResponse.json(
        { error: "user already registered with this email" },
        { status: 409 },
      );
    }
    const newUser = {
      id: Math.max(...Users.map((u) => u.id)) + 1,
      name: body.name,
      email: body.email,
    };
    Users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (Error) {
    return NextResponse.json({ Error: "invalid json data" }, { status: 404 });
  }
}

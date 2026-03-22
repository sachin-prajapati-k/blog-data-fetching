import { Comments, Posts, Users } from "@/src/data/mockData";
import { IParams } from "@/src/types";

import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: IParams) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { id } = await params;
  const userId = parseInt(id);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "invalid user id " }, { status: 404 });
  }
  const user = Users.find((u) => u.id === userId);
  if (!user) {
    return NextResponse.json(
      { error: "user id does not exists" },
      { status: 209 },
    );
  }
  const userPosts = Posts.filter((p) => p.authorId === userId);
  const userComments = Comments.filter((c) => c.authorId === userId);
  const userWithDetails = {
    ...user,
    posts: userPosts,
    comments: userComments,
    stats: {
      total_post: userPosts.length,
      total_comments: userComments.length,
    },
  };
  return NextResponse.json(userWithDetails, { status: 201 });
}

export async function PUT(request: Request, { params }: IParams) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { id } = await params;
  const userId = parseInt(id);
  try {
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "user id is not valid" },
        { status: 404 },
      );
    }
    const userIndex = Users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    const body = await request.json();
    const updateUser = {
      ...Users[userIndex],
      ...body,
      id: userId,
    };
    Users[userIndex] = updateUser;
    return NextResponse.json(updateUser);
  } catch (Error) {
    return NextResponse.json(
      { Error: "id invalid please try agin" },
      { status: 404 },
    );
  }
}

export async function Delete(request: Request, { params }: IParams) {
  const { id } = await params;
  const userId = parseInt(id);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "user id invalid" }, { status: 404 });
  }
  const userIndex = Users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return NextResponse.json(
      { error: "user does not exists with this id " },
      { status: 409 },
    );
  }
  const deletedUser = Users.splice(userIndex, 1)[0];
  return NextResponse.json(
    { message: "user deleted successfully", user: deletedUser },
    { status: 201 },
  );
}

import { NextResponse } from "next/server";

import { Comments, Posts, Users } from "../../../data/mockData";

export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  let filteredPosts = Posts;
  if (authorId) {
    const parsedAuthorId = parseInt(authorId);
    if (!isNaN(parsedAuthorId)) {
      filteredPosts = filteredPosts.filter(
        (p) => p.authorId === parsedAuthorId,
      );
    }
  }
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (p) =>
        p.title.toLocaleLowerCase().includes(searchTerm) ||
        p.content.toLowerCase().includes(searchTerm),
    );
  }
  const postWithAuthors = Posts.map((post) => ({
    ...post,
    author: Users.find((user) => user.id === post.authorId),
  }));

  const postWithDetails = filteredPosts.map((p) => ({
    ...p,
    author: Users.find((user) => user.id === p.authorId),
    comment_count: Comments.filter((c) => c.postId === p.id),
    excerpts: p.content.slice(0, 150) + "...",
  }));

  const sortedPost = postWithDetails.sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case "title":
        aValue = a.title.toLowerCase() || "";
        bValue = b.title.toLowerCase() || "";
        break;
      case "author":
        aValue = a.author?.name.toLowerCase() || "unknown";
        bValue = b.author?.name.toLowerCase() || "unknown";
        break;
      case "commentCount":
        aValue = a.comment_count || 0;
        bValue = b.comment_count || 0;
        break;
      default:
        aValue = new Date(a.createdAt).getTime() || 0;
        bValue = new Date(b.createdAt).getTime() || 0;
    }
    if (order === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return bValue > aValue ? 1 : -1;
    }
  });

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPost = sortedPost.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedPost.length / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return NextResponse.json({
    posts: paginatedPost,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts: sortedPost.length,
      hasNextPage,
      hasPrevPage,
      limit,
    },
    filters: {
      authorId,
      search,
      sortBy,
      order,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.content || !body.authorId) {
      return NextResponse.json(
        { error: "title, content, authorId are required " },
        { status: 400 },
      );
    }
    const author = Users.find((u) => u.id === body.authorId);
    if (!author) {
      return NextResponse.json({ error: "author not found" }, { status: 400 });
    }
    const newPost = {
      id: Math.max(...Posts.map((p) => p.id)) + 1,
      title: body.title,
      content: body.content,
      authorId: body.authorId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    Posts.push(newPost);
    const postWithAuthor = {
      ...newPost,
      author: author,
    };
    return NextResponse.json(postWithAuthor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "json is not valid" }, { status: 404 });
  }
}

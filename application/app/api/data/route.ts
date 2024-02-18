import { fetchPosts } from "@/lib/actions/thread.actions";
import { NextResponse } from "next/server";

// Notice the funciton definiton:
export async function GET(req) {
  const { posts } = await fetchPosts(1, 30);

  return NextResponse.json(posts, {
    status: 200,
  });
}

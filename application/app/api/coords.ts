import { fetchPosts } from "@/lib/actions/thread.actions";
import type { NextApiRequest, NextApiResponse } from "next";

interface Params {
  position: {
    coords: {
      latitude: number;
      longitude: number;
    };
  };
  photo: string;
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

type ResponseData = {
  message: string;
  posts: Params[]; // Array of posts with structure matching Params interface
  isNext: boolean; // Indicates whether there are more posts available
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { posts, isNext } = await fetchPosts(1, 30);

  const responseData: ResponseData = {
    message: "Success",
    posts,
    isNext,
  };

  res.status(200).json(responseData);
}

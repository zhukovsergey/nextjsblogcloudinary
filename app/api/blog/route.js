import Blog from "@/model/Blog";
import { connect } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";

export async function POST(req) {
  await connect();
  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];
  const decodedTokent = verifyJwtToken(token);
  if (!accessToken || !decodedTokent) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const body = await req.json();
    const newBlog = await Blog.create(body);

    return NextResponse.json(newBlog, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function GET(req) {
  await connect();
  try {
    const blogs = await Blog.find({})
      .populate({
        path: "authorId",
        select: "-password",
      })
      .sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

"use server";
import { revalidatePath } from "next/cache";

import Thread from "../models/thread";
import User from "../models/user";
import { connectDB } from "../mongoose";
import Community from "../models/community";

interface Params {
  text: string;
  image: string;
  author: string;
  communityId: string | null;
  path: string;
}
export const createThread = async ({
  text,
  image,
  author,
  communityId,

  path,
}: Params) => {
  try {
    connectDB();
    const create = await Thread.create({
      text,
      image,
      author,
      communityId: null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: create._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
};

export const fetchPosts = async (pageNum = 1, pageSize = 20) => {
  try {
    connectDB();
    const skipPage = (pageNum - 1) * pageSize;
    const postQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipPage)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "community",
        model: Community,
      })
      .populate({
        path: "children", // Populate the children field
        populate: {
          path: "author", // Populate the author field within children
          model: User,
          select: "_id name parentId image", // Select only _id and username fields of the author
        },
      });

    const totalPostCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });
    const posts = await postQuery.exec();
    const isNext = totalPostCount > skipPage + posts.length;

    return { posts, isNext };
  } catch (error: any) {
    throw new Error(`Can't fetch posts,${error.message}`);
  }
};

export const fetchThreadById = async (id: string) => {
  try {
    connectDB();
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      }) // Populate the community field with _id and name
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();
    return thread;
  } catch (error: any) {
    throw new Error(`Fetch thread failed: ${error.message}`);
  }
};

export const AddCommentToThread = async (
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) => {
  try {
    // Find the original thread by its ID
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create the new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId, // Set the parentId to the original thread's ID
    });

    // Save the comment thread to the database
    const savedCommentThread = await commentThread.save();

    // Add the comment thread's ID to the original thread's children array
    originalThread.children.push(savedCommentThread._id);

    // Save the updated original thread to the database
    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Fetch Comments failed: ${error.message}`);
  }
};

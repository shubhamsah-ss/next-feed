import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();
  
  const session = await getServerSession(authOptions)
  const user = session?.user;


  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const dbUser = await UserModel.aggregate([
        { $match: { _id: userId }},
        { $unwind: "$messages" },
        { $sort: {"messages.createdAt": -1}},
        { $group: { _id: "$_id", messages: { $push: "$messages" }}}
    ])
    
    if(!dbUser || dbUser.length === 0) {
        return Response.json(
            {
              success: false,
              message: "No message found",
            },
            { status: 404 }
          );
    }

    return Response.json(
        {
          success: true,
          messages: dbUser[0].messages,
        },
        { status: 200 }
      );
  } catch (error) {
    console.error("Failed to fetch messages", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch messages",
      },
      { status: 500 }
    );
  }
}

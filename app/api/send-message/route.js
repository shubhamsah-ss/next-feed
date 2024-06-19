import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user";
export async function POST(request) {
  await dbConnect();
  const { username, content } = await request.json();

  if (!content || content.length == 0) {
    return Response.json(
      {
        success: false,
        message: "Enter a message first",
      },
      { status: 400 }
    );
  }

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // IS USER ACCEPTING THE MESSAGES
    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages for the moment",
        },
        { status: 430 }
      );
    }

    await UserModel.findOneAndUpdate(
      { username },
      {
        $push: {
          messages: {content},
        },
      },
      { new: true }
    );

    return Response.json(
        {
          success: true,
          message: "Message sent successfully",
        },
        { status: 200 }
      );;
  } catch (error) {
    console.error("Failed to send message", error);
    return Response.json(
      {
        success: false,
        message: "Failed to send message",
      },
      { status: 500 }
    );
  }
}

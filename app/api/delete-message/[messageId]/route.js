import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { UserModel } from "@/models/user";

export async function DELETE(request, { params }) {
  const { messageId } = params;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }
  try {
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      {
        $pull: {
          messages: { _id: messageId },
        },
      }
    );

    if(updatedResult.modifiedCount == 0) {
        return Response.json(
            {
              success: false,
              message: "Message not found",
            },
            { status: 404 }
          );
    }

    return Response.json(
        {
          success: true,
          message: "Message Deleted",
        },
        { status: 200 }
      );

  } catch (error) {
    console.error("Error while deleting message", error);
    return Response.json(
      {
        success: false,
        message: "Error while deleting message",
      },
      { status: 500 }
    );
  }
}

import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request) {

  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    //VALIDATE WITH ZOD
    const result = usernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid username",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = UserModel.findOne({
      username,
      isVerified: true,
    });

    if (!existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already exist",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error while checking username",
      },
      { status: 500 }
    );
  }
}

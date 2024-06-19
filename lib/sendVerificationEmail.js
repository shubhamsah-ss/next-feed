import VerificationEmail from "@/emails/VerificationEmail";
import { resend } from "@/lib/resend";
import { createApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail({ email, username, verifyCode }) {
  try {
    // const emailHtml = ReactDOMServer.renderToStaticMarkup(
    //   <VerificationEmail username={username} otp={verifyCode} />
    // );
    
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Next-Feed | Verification code",
      react: VerificationEmail({ username, otp:verifyCode })
      // html: emailHtml,
    });

    return createApiResponse({ success: true, message: "Verification email sent successfully"});
  } catch (error) {
    console.error("Error sending verification email", error);
    return createApiResponse({success: false, message: "Failed to send verification email"});
  }
}

import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

export default function VerificationEmail({ username, otp }) {
  return(
    <Html>
      <Head>
        <title>Verify Your Account</title>
        <Font 
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello, {username}</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following verification code to complete your registration:
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          <Text>If your did not request this code, please ignore this email.</Text>
        </Row>
      </Section>
    </Html>
  )
}

import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Link } from "@react-email/link";
import { PasswordReset } from "@prisma/client";

const baseUrl = process.env.BASE_URL;

interface Props {
  passwordReset: PasswordReset;
}
export default function ForgotPasswordEmail({ passwordReset }: Props) {
  const url = `${baseUrl}/password-reset/${passwordReset.token}`;

  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Password Reset</Text>
          <Text style={paragraph}>
            If you&apos;ve lost your password or wish to reset it, use the link
            below to get started.
          </Text>

          <Section style={buttonContainer}>
            <Link href={url} style={button}>
              Reset Your Password
            </Link>
          </Section>
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#ECEEF1",
  fontFamily: "Helvetica",
  padding: "80px 20px 120px",
};

const container = {
  margin: "0 auto",
  padding: "20px 20px 48px",
  width: "100%",
  maxWidth: "580px",
  backgroundColor: "#ffffff",
  borderRadius: "5px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "black",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.4",
  color: "#484848",
};

const buttonContainer = {
  paddingTop: "24px",
  display: "block",
};

const button = {
  backgroundColor: "#17A34A",
  fontWeight: "bold",
  borderRadius: "5px",
  color: "#ffffff",
  cursor: "pointer",
  fontSize: "18px",
  lineHeight: "18px",
  padding: "13px 17px",
};

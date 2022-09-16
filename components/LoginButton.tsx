import { useSession, signIn, signOut } from "next-auth/react";
import Button from "react-bootstrap/Button";

export default function LoginButton() {
    const { data: session } = useSession()
    if (session) {
      return (
        <>
          <Button 
          variant="danger" 
          onClick={async () => {
            await signOut();
            location.href='/';
          }} 
          className="me-2 d-inline-block align-middle"
          >Log Out</Button>
        </>
      )
    }
    return (
        <Button variant="success" onClick={() => signIn()}>Login</Button>
    )
  }
import "./mylogin.css";
import { motion } from "framer-motion";
import { useSignIn } from "@clerk/clerk-react";

export default function MyLogin() {
  const { signIn } = useSignIn();
  // ! handlers
  const onSignInSuccess = () => {
    console.log("Sign-in successful!");
  };
  const signInWithGoogle = () =>
    signIn
      ?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
      .then(onSignInSuccess);
  const signInWithFacebook = () =>
    signIn
      ?.authenticateWithRedirect({
        strategy: "oauth_facebook",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
      .then(onSignInSuccess);

  const signInWithApple = () =>
    signIn
      ?.authenticateWithRedirect({
        strategy: "oauth_apple",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
      .then(onSignInSuccess);

  let links: { label: string; method: () => void }[] = [
    { label: "Google", method: signInWithGoogle },
    { label: "Facebook", method: signInWithFacebook },
    { label: "Apple", method: signInWithApple },
  ];

  return (
    <main>
      <h1 className="text-[2rem] font-bold text-center my-[3rem]">Sign In</h1>
      <ul
        role="list"
        className="flex-col flex items-center gap-y-[1.5rem] w-full "
      >
        {links.map((e, i) => (
          <motion.li whileHover={{ scale: 1.1 }} role="listitem" key={i}>
            <button
              onClick={e.method}
              className="border-2 font-medium border-black w-[17rem] h-[3rem] rounded-full"
            >
              {e.label}
            </button>
          </motion.li>
        ))}
      </ul>
    </main>
  );
}

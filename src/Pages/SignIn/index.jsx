import { useContext, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";

function SingIn() {
  const { account, setSignOut, setAccount } = useContext(ShoppingCartContext);
  const [view, setView] = useState("user-info");
  const form = useRef(null);

  // Account
  const accountLocalStorage = localStorage.getItem("account");
  const parsedAccount = JSON.parse(accountLocalStorage);

  // Has an account
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = account
    ? Object.keys(account).length === 0
    : true;
  const hasUserAnAccount = !noAccountInLocalStorage && !noAccountInLocalState;

  const handleSignIn = () => {
    const strigifiedSignOut = JSON.stringify(false);
    localStorage.setItem("sign-out", strigifiedSignOut);
    setSignOut(false);
    // Redirect
    return <Navigate replace to={"/"} />;
  };

  const createAnAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // Create account
    const strigifiedAccount = JSON.stringify(data);
    localStorage.setItem("account", strigifiedAccount);
    setAccount(data);
    handleSignIn();
  };

  const renderLogIn = () => {
    return (
      <div className="flex flex-col w-80">
        <p>
          <span className="font-light text-sm">Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <p>
          <span className="font-light text-sm">Password: </span>
          <span>{parsedAccount?.password}</span>
        </p>
        <Link to="/">
          <button
            className="bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2"
            disabled={!hasUserAnAccount}
            onClick={() => handleSignIn()}
          >
            Log In
          </button>
        </Link>
        <div className="text-center">
          <a
            className="font-light text-xs underline underline-offset-4"
            href="/"
          >
            Forgot my password
          </a>
        </div>
        <button
          className="border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-4"
          disabled={hasUserAnAccount}
          onClick={() => setView("create-user-info")}
        >
          Sign up
        </button>
      </div>
    );
  };

  const renderCreateUserInfo = () => {
    return (
      <form className="flex flex-col gap-4 w-80" ref={form}>
        <div className="flex flex-col gap-1">
          <label className="font-light text-sm" htmlFor="name">
            Your name:
          </label>
          <input
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount?.name}
            placeholder="Peter"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-light text-sm" htmlFor="email">
            Your email:
          </label>
          <input
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            type="email"
            id="email"
            name="email"
            defaultValue={parsedAccount?.email}
            placeholder="email@example.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-light text-sm" htmlFor="password">
            Your password:
          </label>
          <input
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            type="text"
            id="password"
            name="password"
            defaultValue={parsedAccount?.password}
            placeholder="*****"
          />
        </div>
        <Link to="/">
          <button
            className="bg-black text-white w-full rounded-lg py-3"
            onClick={() => createAnAccount()}
          >
            Create
          </button>
        </Link>
      </form>
    );
  };

  const renderView = () =>
    view === "create-user-info" ? renderCreateUserInfo() : renderLogIn();

  return (
    <>
      <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome</h1>
      {renderView()}
    </>
  );
}

export default SingIn;

import { FormEvent, useState } from "react";
import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Axios from "axios";
import InputGroup from "./components/InputGroup";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    //checking if the agreement checkbox has been checked
    if (!agreement) {
      setErrors({ ...errors, agreement: "You must agree to T&Cs" });
      return;
    }
    try {
      await Axios.post("auth/register", {
        email,
        password,
        username,
      });

      router.push("/login");
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex">
      <Head>
        <title>Register</title>
      </Head>

      {/* //Image */}
      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: "url('/images/bricks.jpg')" }}
      ></div>

      {/* //Form */}
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Sign up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>

          <form onSubmit={submitForm}>
            <div className="mb-6">
              <input
                type="checkbox"
                className="mr-1 curso-pointer"
                id="agreement"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <label htmlFor="agrrement" className="text-xs cursor-pointer">
                I agree to get emails about cool stuff on Readit
              </label>
              <small className="block font-medium text-red-600">
                {errors.agreement}
              </small>
            </div>
            <InputGroup
              className="mb-2"
              placeholder="Email"
              value={email}
              type="email"
              error={errors.email}
              setValue={setEmail}
            />
            <InputGroup
              className="mb-2"
              placeholder="Username"
              value={username}
              type="text"
              error={errors.username}
              setValue={setUsername}
            />
            <InputGroup
              className="mb-4"
              placeholder="Password"
              value={password}
              type="password"
              error={errors.password}
              setValue={setPassword}
            />
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              Sign Up
            </button>
          </form>
          <small>
            Already a readitor ?
            <Link href="/login">
              <a className="ml-1 text-blue-500 uppercase">LOG IN</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

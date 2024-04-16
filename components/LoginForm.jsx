"use client";
import Input from "./Input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const initialState = {
  name: "",
  email: "",
  password: "",
};
const LoginForm = () => {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setHydrated(true);
  });
  if (!hydrated) return null;
  const handleChange = (e) => {
    setError("");
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = state;

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    // Regular expression pattern for a basic email validation
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!pattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        setIsLoading(false);
        return;
      }

      router.push("/blog");
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  return (
    <div>
      <section className="container">
        <form
          onSubmit={handleSubmit}
          className="border-2 border-paragraphColor rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5"
        >
          <h2 className="text-center special-word">Форма входа</h2>

          <Input
            label="email"
            type="text"
            name="email"
            onChange={handleChange}
            value={state.email}
          />
          <Input
            label="password"
            type="password"
            name="password"
            onChange={handleChange}
            value={state.password}
          />
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <button type="submit" className="btn w-full">
            {isLoading ? "Загрузка..." : "Войти"}
          </button>
          <p className="text-center">
            Не зарегистрированы?
            <Link href="/signup" className="text-primaryColor font-bold">
              &nbsp;Войти
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default LoginForm;

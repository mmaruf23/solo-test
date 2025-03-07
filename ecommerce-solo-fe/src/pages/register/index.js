import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Navbar from "@/components/organism/Navbar";
import { register } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterPage() {
  const [warning, setWarning] = useState();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (e.target.password.value == e.target.cpassword.value) {
      const payload = {
        name: e.target.name.value,
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };

      console.log(payload);
      setWarning("Loading...");

      const response = await register(payload);
      if (response.status) {
        alert("Berhasil register. silahkan login");
        router.push("/login");
      } else {
        setWarning(response.message);
      }

    } else {
      setWarning("Password not match!");

    }

  }

  return (
    <div className="flex flex-col min-h-[100svh] items-center">
      <div className="w-full flex justify-center shadow sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="mt-10 w-full max-w-[1280px] flex justify-center">
        <div>
          <form onSubmit={(e) => handleSubmit(e)} className="w-96 p-4 border rounded-2xl">
            <p>Masuk</p>
            <p>Sudah punya akun? <Link href={"/login"}>Login</Link></p>
            <div className="flex-grow w-full flex flex-col gap-4 mt-8">
              <Input label={"name"} text={"Name"} placeholder="Fullname" />
              <Input label={"username"} text={"Username"} placeholder="username" />
              <Input label={"email"} text={"Email"} placeholder="email" />
              <Input label={"password"} text={"New Password"} placeholder="password" type="password" />
              <Input label={"cpassword"} text={"ConfirmPassword"} placeholder="confirm password" type="password" />
              <p>{warning}</p>
            </div>
            <Button type="submit" className={"bg-red-600 hover:bg-red-700 text-white w-full mt-5"}>Register</Button>
          </form>
        </div>
      </div>
    </div>

  );
};

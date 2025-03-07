import { useAdmin, useLogin } from "@/hooks/useLogin";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MenuBar({ close }) {
  const [isLogin, setIsLogin] = useLogin();
  const isAdmin = useAdmin();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLogin(false);
    close();
    alert("Success Logout");
    router.push("/");

  }

  return isLogin ? (
    <>
      {isAdmin && (
        <Link href={"/dashboard"}>
          <div className="flex justify-center mt-6 gap-4 px-5" >
            <span className={"bg-black text-white w-full text-center p-4"}>Admin Dashboard</span>
          </div>
        </Link>
      )}
      <Link href={"/profile"} className="flex justify-center mt-6 gap-4 px-5" >
        <span className={"bg-gray-600 text-white w-full text-center p-4"}>Profile</span>
      </Link>
      <div className="flex justify-center mt-6 gap-4 px-5" >
        <button onClick={handleLogout} className={"bg-red-600 text-white w-full text-center p-4"}>Logout</button>
      </div>
    </>
  ) : (
    <div className="flex justify-center mt-6 gap-4 px-5" >
      <Link href={"/login"} className={"bg-red-600 text-white w-full text-center p-4"}>Masuk</Link>
      <Link href={"/register"} className={"border w-full text-center p-4"}>Daftar</Link>
    </div>
  );
};

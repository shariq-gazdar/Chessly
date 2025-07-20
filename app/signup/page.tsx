"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/config/firebase";
import Image from "next/image";
import IconRenderer from "@/components/IconRenderer";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/userContext";

function Signup() {
  const router = useRouter();
  const { setUser } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, imageUrl, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: imageUrl,
      });
      setUser(auth);
      alert("User created successfully!");

      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col space-y-4 w-[300px]"
      >
        <h1 className="text-[35px] font-heading text-center">Sign Up</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="p-2 rounded-4xl bg-surface pl-5"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          className="p-2 rounded-4xl bg-surface pl-5"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 rounded-4xl bg-surface pl-5"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="p-2 rounded-4xl bg-surface pl-5 w-full"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-sm text-blue-500 hover:underline absolute right-5 top-2"
          >
            {showPassword ? (
              <IconRenderer name="EyeClosed" />
            ) : (
              <IconRenderer name="Eye" />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="p-2 rounded-4xl bg-surface pl-5 w-full"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="text-sm text-blue-500 hover:underline absolute right-5 top-2"
          >
            {showConfirmPassword ? (
              <IconRenderer name="EyeClosed" />
            ) : (
              <IconRenderer name="Eye" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="bg-red text-white py-2 rounded-3xl hover:bg-red/85 cursor-pointer"
        >
          Sign Up
        </button>

        <button className="flex justify-center relative  bg-blue-500 rounded-3xl items-center h-[2.5rem] hover:bg-blue-500/85 cursor-pointer">
          <Image
            src={"/GoogleLogo.png"}
            width={40}
            height={40}
            alt="Google Logo"
            className="absolute left-0"
          />
          Sign In With Google
        </button>
      </form>
    </div>
  );
}

export default Signup;

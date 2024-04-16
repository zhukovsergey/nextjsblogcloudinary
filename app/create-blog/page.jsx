"use client";
import Input from "@/components/Input.jsx";
import TextArea from "@/components/TextArea.jsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
const initialState = {
  title: "",
  description: "",
  excerpt: "",
  quote: "",
  category: "",
  photo: "",
};

const CreateBlog = () => {
  const CLOUD_NAME = "dj28przdb";
  const UPLOAD_PRESET = "nextjs_blog_images";
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated") {
    return <div>Unauthorized</div>;
  }

  const handleChange = (e) => {
    setError("");
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setState({ ...state, [name]: files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, excerpt, quote, category, photo } = state;
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!description) {
      setError("Description is required");
      return;
    }
    if (!excerpt) {
      setError("Excerpt is required");
      return;
    }
    if (!quote) {
      setError("Quote is required");
      return;
    }
    if (!category) {
      setError("Category is required");
      return;
    }
    if (!photo) {
      setError("Photo is required");
      return;
    }

    if (photo) {
      const maxSize = 5 * 1024 * 1024; //5 mb max file size
      if (photo.size > maxSize) {
        setError("File size is too large. Max file size is 5mb");
        return;
      }
    }
    if (title.length < 4) {
      setError("Title must be at least 4 characters long");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      setSuccess("");
      const image = await uploadImage();
      const newBlog = {
        title,
        description,
        excerpt,
        quote,
        category,
        image,
        authorId: session?.user?._id,
      };
      const response = await fetch("/api/blog", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(newBlog),
      });
      if (response.status === 200) {
        setSuccess("Blog created successfully");
        setState(initialState);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadImage = async () => {
    if (!state.photo) {
      return;
    }
    const formData = new FormData();
    formData.append("file", state.photo);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      const image = {
        id: data["public_id"],
        url: data["secure_url"],
      };
      return image;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="container max-w-3xl">
      <h2 className="mb-5">
        <span className="special-word">Создание</span> записи
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="title"
          type="text"
          name="title"
          onChange={handleChange}
          value={state.title}
        />
        <TextArea
          label="excerpt"
          rows="2"
          name="excerpt"
          onChange={handleChange}
          value={state.excerpt}
        />
        <TextArea
          label="description"
          rows="4"
          name="description"
          onChange={handleChange}
          value={state.description}
        />
        <TextArea
          label="quote"
          rows="2"
          name="quote"
          onChange={handleChange}
          value={state.quote}
        />
        <div>
          <label className="block">Select an option</label>
          <select
            name="category"
            onChange={handleChange}
            value={state.category}
            className="block rounded-lg w-full p-3 bg-primaryColorLight"
          >
            <option value="Дорамы">Дорамы</option>
            <option value="ТВ шоу">ТВ шоу</option>
            <option value="Другие">Другие</option>
          </select>
        </div>
        <div className="">
          <label className="block mb-2 text-sm dont-medium">
            Выберите фото
          </label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="block rounded-lg w-full p-3 bg-primaryColorLight"
            accept="image/*"
          />
        </div>
        {state.photo && (
          <div>
            <Image
              src={URL.createObjectURL(state.photo)}
              priority
              alt="simple"
              width={0}
              height={0}
              sizes="100vw"
              className="w-32 mt-5 rounded-md shadow-md shadow-gray-400/20"
            />
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button type="submit" className="btn w-full">
          {isLoading ? "Загрузка..." : "Сохранить"}
        </button>
      </form>
    </section>
  );
};

export default CreateBlog;

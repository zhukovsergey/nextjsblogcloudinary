import FirstBlog from "@/components/FirstBlog";
import OtherBlogs from "@/components/OtherBlogs";

async function fetchBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const Blog = async () => {
  const blogs = await fetchBlogs();
  const firstBlog = blogs && blogs[0];
  const otherBlogs = blogs.length > 1 && blogs.slice(1);

  return (
    <div>
      {blogs?.length > 0 ? (
        <>
          <div className="container">
            <h2 className="text-center my-10">
              <span className="text-primaryColor">Trending blog</span>{" "}
            </h2>
            <FirstBlog firstBlog={firstBlog} />
            <OtherBlogs otherBlogs={otherBlogs} />
          </div>
        </>
      ) : (
        <h3>Нет записей</h3>
      )}
    </div>
  );
};

export default Blog;

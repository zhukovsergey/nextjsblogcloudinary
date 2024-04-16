import Link from "next/link";
const NotFound = () => {
  return (
    <div className="container h-screen flex flex-col gap-5 justify-center items-center">
      <h2>Страница не найдена</h2>
      <p>Не найден запрошенный ресурс</p>
      <Link href="/">Вернуться</Link>
    </div>
  );
};

export default NotFound;

import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

const Header = () => {
  return (
    <header className="flex justify-between p-10 items-center bg-black bg-opacity-70">
      <Link
        href="/"
        className="h-12 w-12 md:w-5vw md:h-5vw flex justify-center items-center rounded-full overflow-hidden relative"
      >
        <Image
          src="/images/next.png"
          className="w-full h-full"
          fill
          alt="next js"
          sizes="full"
        />
      </Link>
      <div className="flex gap-5 h-full items-center">
        <NavLink
          href="/"
          className="font-bold text-biru-tua hover:text-biru-muda transition-colors decoration-biru-tua hover:decoration-biru-muda decoration-4"
          activeClassName="underline underline-offset-8 hover:text-biru-tua hover:decoration-biru-tua"
          exact
        >
          Home
        </NavLink>
        <NavLink
          href="/posts/1"
          className="font-bold text-biru-tua hover:text-biru-muda transition-colors decoration-biru-tua hover:decoration-biru-muda decoration-4"
          activeClassName="underline underline-offset-8 hover:text-biru-tua hover:decoration-biru-tua"
          matchingPath="/posts"
        >
          Posts
        </NavLink>
        <NavLink
          href="/users"
          className="font-bold text-biru-tua hover:text-biru-muda transition-colors decoration-biru-tua hover:decoration-biru-muda decoration-4"
          activeClassName="underline underline-offset-8 hover:text-biru-tua hover:decoration-biru-tua"
        >
          Users
        </NavLink>
      </div>
    </header>
  );
};

export default Header;

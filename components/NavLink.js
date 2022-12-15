import { useRouter } from "next/router";
import Link from "next/link";

const NavLink = ({
  href,
  exact,
  children,
  activeClassName,
  matchingPath,
  ...props
}) => {
  const { asPath } = useRouter();
  let isActive = exact ? asPath === href : asPath.startsWith(href);
  if (matchingPath) {
    isActive = exact
      ? asPath === matchingPath
      : asPath.startsWith(matchingPath);
  }

  if (isActive) {
    props.className += ` cursor-default ${activeClassName}`;
  }

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        if (isActive) e.preventDefault();
      }}
    >
      {children}
    </Link>
  );
};

export default NavLink;

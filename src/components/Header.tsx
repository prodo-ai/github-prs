import * as React from "react";
import { Link } from "@prodo/route";

const Header = () => (
  <header>
    <Link to="/" className="none">
      Prodo PRs
    </Link>
  </header>
);

export default Header;

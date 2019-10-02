import * as React from "react";
import { Link } from "@prodo/route";

const Header = () => (
  <header>
    <div className="container">
      <Link to="/">Github PR List</Link>
    </div>
  </header>
);

export default Header;

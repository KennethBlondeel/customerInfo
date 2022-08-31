import { Fragment, useEffect, useRef, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";

const Nav = () => {
  const history = useHistory();
  let { est, ent } = useParams();



  const logout = () => {
    localStorage.removeItem('token');
    history.push(`/${ent}/${est}/login`)
  }

  return (
    <div className="nav">
      <img
        src="https://totaalinfo.files.wordpress.com/2015/05/erpe-mere-logo-def-high-res.jpg"
        alt="municipality logo"
      />
      <p>
        <span>Home</span>
      </p>
      <p>
        <span>0 Messages</span>
      </p>
      <p>
        <span>0 Downloads</span>
      </p>
      <p>
        <span onClick={() => logout()}>Logout</span>
      </p>
    </div>
  );
};

export default Nav;

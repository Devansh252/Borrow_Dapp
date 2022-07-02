import React, { Component } from "react";
import "./App.css";

class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar myNav navbar-dark fixed-top  flex-md-nowrap p-0 shadow"
        style={{}}
      >
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          href="/#"
          style={{ fontFamily: "sans-serif", fontWeight: "bold" }}
        >
          Borrowing Dapp
        </a>

        <ul className="navbar-nav px-5">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            {this.props.account === "0x0" ? (
              <button
                onClick={this.props.connetctWallet}
                type="submit"
                className="btn button btn-primary btn-block btn-sm"
              >
                Connect Wallet
              </button>
            ) : (
              <small className="text-secondary">
                <small
                  id="account"
                  style={{
                    fontFamily: "sans-serif",
                    color: "white",
                    fontSize: "medium",
                  }}
                >
                  {this.props.account}
                </small>
              </small>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

import React, { useState } from "react";

function MainCard({
  stakingBalance,
  stableTokenBalance,
  cypherTokenBalance,
  stakeTokens,
  unstakeTokens,
}) {
  const [amount, setamount] = useState(null);

  return (
    <div id="content" className="mt-3">
      <div className="card mb-4">
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col" className="th">
                Staking Balance
              </th>
              <th className="th" scope="col">
                Reward Balance
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(stakingBalance, "Ether")} CY</td>
              <td>
                {window.web3.utils.fromWei(stableTokenBalance, "Ether")} Stable
                Token
              </td>
            </tr>
          </tbody>
        </table>
        <div className="card-body card">
          <form
            className="mb-3"
            onSubmit={(event) => {
              event.preventDefault();

              stakeTokens(amount);
            }}
          >
            <div>
              <label className="float-left">
                <b>Stake Tokens</b>
              </label>
              <span className="float-right text-muted">
                Balance:{" "}
                {window.web3.utils.fromWei(cypherTokenBalance, "Ether")}
              </span>
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="0"
                onChange={(e) =>
                  setamount(window.web3.utils.toWei(e.target.value, "Ether"))
                }
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img
                    class="rounded-circle"
                    src={
                      "https://www.mandatory.gg/wp-content/uploads/database/graffitis/final/valorant-database-graffiti-je_te_vois.jpg"
                    }
                    height="32"
                    alt=""
                  />
                  &nbsp;&nbsp;&nbsp; CY
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn button btn-primary btn-block btn-lg"
            >
              Borrow!
            </button>
          </form>
          <button
            type="submit"
            className="btn  btn-block btn-sm"
            onClick={(event) => {
              event.preventDefault();
              unstakeTokens();
            }}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainCard;

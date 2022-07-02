import React, { Component } from "react";
import Navbar from "./Navbar";
import "./App.css";
import Web3 from "web3";
import CypherToken from "../abis/CypherToken.json";
import StableToken from "../abis/StableToken.json";
import Vault from "../abis/Vault.json";
import MainCard from "./MainCard";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    console.log(networkId);

    // Load CYToken
    const cypherTokenData = CypherToken.networks[networkId];
    if (cypherTokenData) {
      const cypherToken = new web3.eth.Contract(
        CypherToken.abi,
        cypherTokenData.address
      );
      this.setState({ cypherToken });
      let cypherTokenBalance = await cypherToken.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ cypherTokenBalance: cypherTokenBalance.toString() });
      console.log(cypherTokenBalance);
    } else {
      window.alert("CypherToken contract not deployed to detected network.");
    }

    // Load StableToken
    const stableTokenData = StableToken.networks[networkId];
    if (stableTokenData) {
      const stableToken = new web3.eth.Contract(
        StableToken.abi,
        stableTokenData.address
      );
      this.setState({ stableToken });
      let stableTokenBalance = await stableToken.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ stableTokenBalance: stableTokenBalance.toString() });
    } else {
      window.alert("stableToken contract not deployed to detected network.");
    }

    // Load TokenFarm
    const vaultData = Vault.networks[networkId];
    if (vaultData) {
      const vault = new web3.eth.Contract(Vault.abi, vaultData.address);
      this.setState({ vault });
      let stakingBalance = await vault.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert("Vault contract not deployed to detected network.");
    }

    this.setState({ loading: false });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  connetctWallet = () => {
    this.componentWillMount();
  };

  stakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.cypherToken.methods
      .approve(this.state.vault._address, amount)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.state.vault.methods
          .stakeTokens(amount)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false });
          });
      });
  };

  unstakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.vault.methods
      .unstakeTokens()
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      cypherToken: {},
      stableToken: {},
      vault: {},
      cypherTokenBalance: "0",
      vaultTokenBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  render() {
    return (
      <div className="body">
        <Navbar
          account={this.state.account}
          connetctWallet={this.componentDidMount}
        />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px" }}
            >
              {this.state.loading ? (
                <p style={{ textAlign: "center" }}>Loading ...</p>
              ) : (
                <MainCard
                  cypherTokenBalance={this.state.cypherTokenBalance}
                  stableTokenBalance={this.state.stableTokenBalance}
                  stakingBalance={this.state.stakingBalance}
                  stakeTokens={this.stakeTokens}
                  unstakeTokens={this.unstakeTokens}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

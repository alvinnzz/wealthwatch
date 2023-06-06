import Logo from "../../Resources/logoSample.png";
import "./navbarStyle.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function NavBar({
  token,
  setToken,
  setTransactionHistory,
  transactionHistory,
}) {
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const uid = sessionStorage.getItem("userId");
      const response = await fetch(
        "http://localhost:5001/api/transactions/user/" + uid,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      setTransactionHistory(responseData.transactions);
      // console.log(transactionHistory);
      console.log(transactionHistory);
      console.log(responseData.transactions);
    } catch (err) {
      console.log(err);
      alert("Receiving transaction failed!");
    }
  };
  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <img className="logo" src={Logo} alt="WealthWatch" />

        {/* Navigation Menu */}
        <ul className="nav-links">
          <div className="menu">
            <li>
              <Button
                colorScheme="#ffcc80"
                variant="link"
                color="black"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
            </li>

            {token != null && (
              <li className="services">
                <Button colorScheme="#ffcc80" variant="link" color="black">
                  Services
                </Button>
                <ul className="dropdown">
                  <li>
                    <Button
                      colorScheme="#ffcc80"
                      variant="link"
                      color="black"
                      onClick={() => {
                        navigate("/financialtracker");
                        fetchTransactions();
                      }}
                    >
                      Transaction Page
                    </Button>
                    <Button
                      mt="5px"
                      colorScheme="#ffcc80"
                      variant="link"
                      color="black"
                      onClick={() => navigate("/stocksoverview")}
                    >
                      Stocks Overview
                    </Button>
                  </li>
                </ul>
              </li>
            )}

            {token != null && (
              <li>
                <Button
                  colorScheme="#ffcc80"
                  variant="link"
                  color="black"
                  onClick={() => {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("userId");
                    setToken();
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </li>
            )}

            {token == null && (
              <li>
                <Button
                  colorScheme="#ffcc80"
                  variant="link"
                  color="black"
                  onClick={() => (window.location = "/login")}
                >
                  Login
                </Button>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;

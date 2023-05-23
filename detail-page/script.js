document
  .getElementById("connectButton")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    try {
      let accounts = await window.unisat.requestAccounts();
      console.log("connect success", accounts);

      let accountsString = String(accounts);
      let truncatedAccounts =
        accountsString.substring(0, 3) +
        "..." +
        accountsString.substring(accountsString.length - 3);

      // Store the truncated accounts value in local storage
      localStorage.setItem("truncatedAccounts", truncatedAccounts);

      // Check if the button's text content has already been modified
      if (
        document.getElementById("connectButton").textContent !==
        truncatedAccounts
      ) {
        document.getElementById("connectButton").textContent =
          truncatedAccounts;

        // Enable the startNowButton and set the text to "Start now"
        document.getElementById("startNowButton").classList.remove("inactive");
        document.getElementById("startNowButton").textContent = "Start now";
      }

      let res = await window.unisat.getBalance();
      console.log(res);

      // Store the balance value in local storage
      localStorage.setItem("balance", res.total);

      document.getElementById("balance-div").classList.add("visible");
      document.getElementById("connectButton").classList.add("balance");
      document.getElementById("balance").textContent = res.total + " BTC";
    } catch (e) {
      console.log("connect failed", e);
    }
  });

// Retrieve the truncated accounts value and balance from local storage on page load
window.addEventListener("load", function () {
  let truncatedAccounts = localStorage.getItem("truncatedAccounts");
  if (truncatedAccounts) {
    document.getElementById("connectButton").textContent = truncatedAccounts;
    document.getElementById("startNowButton").classList.remove("inactive");
    document.getElementById("startNowButton").textContent = "Start now";
  } else {
    document.getElementById("startNowButton").classList.add("inactive");
    document.getElementById("startNowButton").textContent =
      "Connect the wallet also";
  }

  let balance = localStorage.getItem("balance");
  if (balance) {
    document.getElementById("balance-div").classList.add("visible");
    document.getElementById("connectButton").classList.add("balance");
    document.getElementById("balance").textContent = balance + " BTC";
  }
});

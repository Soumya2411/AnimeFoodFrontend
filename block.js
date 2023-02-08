var web3;
var address = "";

async function Connect() {
  await window.web3.currentProvider.enable();
  web3 = new Web3(window.web3.currentProvider);
}
if (web3 !== undefined) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3(new Web3.Provider.HttpProvider("HTTP://127.0.0.1:7545"));
}

document.querySelector("#connect").addEventListener("click", Connect);
var abi = [];
var contract = new web3.eth.Contract(abi, address);

function deposite() {
  var inputval = document.getElementById("amount").value;
  web3.eth
    .getAccounts()
    .then(function (account) {
      return contract.methods
        .deposite_money(inputval)
        .send({ from: account[0] });
    })
    .then(function (tmp) {
      $("amount").val("");
    })
    .catch(function (tmp) {
      alert(tmp);
    });
}
document.querySelector("#deposit").addEventListener("click", deposite);

function withdraw() {
  var inputval = document.getElementById("amount").value;
  web3.eth
    .getAccounts()
    .then(function (account) {
      return contract.methods
        .deposite_money(inputval)
        .send({ from: account[0] });
    })
    .then(function (tmp) {
      $("amount").val("");
    })
    .catch(function (tmp) {
      alert(tmp);
    });
}

var statement = {
  accountType: [],
  Date: [],
  Description: [],
  TransactionNo: [],
  Credit: [],
  Closingbalence: [],
};
var balences = {
  savingsBalence: "20000.50",
  currentBalence: "24583.00",
  creditBalence: "16792.10",
};

var accountNumbers;

const addDetailstoID = (details) => {
  for (const detail in details) {
    const element = document.getElementById(detail);
    element.textContent = details[detail];
  }
};

const loadData = (cID) => {
  const SavingsAccountSummary = {
    SaccNo: 786543092,
    Sbranch: "Ashok Nagar",
    Sname: cID,
    Sifsc: "CDBL0009",
  };
  const currentAccountSummary = {
    CaccNo: 543092786,
    Cbranch: "Ashok Nagar",
    Cname: cID,
    Cifsc: "CDBL0009",
  };

  const creditAccountSummary = {
    creditCardNo: "XXXX XXXX XXXX 1225",
    creditType: "Visa",
    creditName: cID,
  };
  accountNumbers = {savings:SavingsAccountSummary['SaccNo'],current:currentAccountSummary['CaccNo'],credit:creditAccountSummary['creditCardNo']}

  statement = JSON.parse(localStorage.getItem("statement")) || {
    accountType: [],
    Date: [],
    Description: [],
    TransactionNo: [],
    Credit: [],
    Closingbalence: [],
  };

  addDetailstoID(SavingsAccountSummary);
  addDetailstoID(currentAccountSummary);
  addDetailstoID(creditAccountSummary);
};

const loadBalances = () => {
  balences = JSON.parse(localStorage.getItem("balences")) || {
    savingsBalence: "20000.50",
    currentBalence: "24583.00",
    creditBalence: "16792.10",
  };
  let formattedBalence = {}
  for(const accountType in balences){
    formattedBalence[accountType] = Number(balences[accountType]).toLocaleString();
  }
  addDetailstoID(formattedBalence);
};

document.addEventListener("DOMContentLoaded", () => {
  let cID = localStorage.getItem("cID");
  if (!cID) window.location.href = "login.html";

  const mainHeading = document.getElementById("mainHeading");
  mainHeading.textContent = "Greetings " + cID + "!";

  loadData(cID);
  loadBalances();
});

const switchTab = (tabID) => {
  const activeContent = document.getElementsByClassName("active-content");

  activeContent[0].style.display = "none";
  activeContent[0].classList.remove("active-content");

  const selectedContent = document.getElementById(tabID);
  selectedContent.style.display = "block";
  selectedContent.classList.add("active-content");

  const activeTab = document.getElementsByClassName("active-tab");

  activeTab[0].classList.remove("active-tab");

  const selectedTab = document.getElementById(tabID + "Tab");
  selectedTab.classList.add("active-tab");
};

const openSubTab = (subTabOpenID) => {
  const subTabOpenElement = document.getElementById(subTabOpenID);
  subTabOpenElement.style.transform =
    subTabOpenElement.style.transform == "rotate(0deg)"
      ? "rotate(180deg)"
      : "rotate(0deg)";
};

const viewStatement = (accountType) => {

  const statementModelElement = document.getElementById('statementModel')
  statementModelElement.style.display='flex'

  const accountNumberElement = document.getElementById(
    "statementAccountNumber"
  );
  accountNumberElement.textContent = `Account No: ${accountNumbers[accountType]}`;

  const statementElement = document.getElementById("statement");

  while(statementElement.childNodes.length>2){
    statementElement.removeChild(statementElement.lastChild);
  }

  for (let ind = statement["Date"].length - 1; ind >= 0; ind--) {
    console.log(statement["accountType"] + " " + accountType);
    if (statement["accountType"][ind] !== accountType) continue;

    const tr = document.createElement("tr");
    tr.classList.add("statement-table");
    for (let head in statement) {
      if (head === "accountType") continue;
      const td = document.createElement("td");
      td.textContent = statement[head][ind];
      tr.appendChild(td);
    }
    statementElement.appendChild(tr);
  }
};

const closeStatement = ()=>{
  const statementModelElement = document.getElementById('statementModel')
  statementModelElement.style.display='none'
}

const resetForm = () => {
  const accountElement = document.getElementById("accountType");
  const beneficiaryElement = document.getElementById("beneficiary");
  const ammountElement = document.getElementById("ammount");
  const remarksElement = document.getElementById("remarks");
  accountElement.value = "";
  beneficiaryElement.value = "";
  ammountElement.value = "";
  remarksElement.value = "";
};

const showMessage = (message) => {
  const showMessageElement = document.getElementById("transactionMessage");
  showMessageElement.textContent = message;

  setTimeout(() => {
    showMessageElement.textContent = "";
  }, 4000);
};

const sendMoney = () => {
  const accountElement = document.getElementById("accountType");
  const beneficiaryElement = document.getElementById("beneficiary");
  const ammountElement = document.getElementById("ammount");
  // const remarksElement = document.getElementById("remarks");
  const account = accountElement.value;
  const beneficiary = beneficiaryElement.value;
  const ammount = ammountElement.value;
  // const remarks = remarksElement.value;

  if(account===''){
    showMessage("Please choose an account")
    return
  }
  if(beneficiary===''){
     showMessage("Please choose an beneficiary")
    return
  }

  if (isNaN(ammount) || Number(ammount) <= 0) {
    showMessage(
      `Can't transfer ammount ${ammount}, please enter amount value greater than 0`
    );
    return;
  }
  if (Number(balences[account + "Balence"]) < Number(ammount)) {
    showMessage(
      `Transfer of Rs. ${Number(ammount)} from your ${account} account has failed fue to insufficiant balence! cuttent balence: ${
        balences[account + "Balence"]
      }`
    );
    return;
  }

  // console.log(statement);
  statement["accountType"].push(account);
  statement["Date"].push(new Date(Date.now()).toISOString().slice(0, 10));
  statement["Description"].push(beneficiary);
  statement["TransactionNo"].push((Math.random() * 100000).toFixed(0));
  statement["Credit"].push(ammount);
  let closeBalence = Number(balences[account + "Balence"]);
  closeBalence = closeBalence - Number(ammount);
  balences[account + "Balence"] = closeBalence.toFixed(2);
  statement["Closingbalence"].push(closeBalence);

  localStorage.setItem("balences", JSON.stringify(balences));
  localStorage.setItem("statement", JSON.stringify(statement));
  resetForm();
  loadBalances();
  showMessage(
    `Transfer of Rs. ${
      ammount
    } from your ${account} account is successful!`
  );
};

const logout = () => {
  localStorage.removeItem("cID");
  window.location.href = "login.html";
};

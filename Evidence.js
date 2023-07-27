function Insured(firstName, lastName, age, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.phoneNumber = phoneNumber;
  }

  // Method to display Insured Person in the table
  Insured.prototype.displayInTable = function() {
    const table = document.getElementById("insuredTable");
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.innerHTML = this.firstName;
    cell2.innerHTML = this.lastName;
    cell3.innerHTML = this.age;
    cell4.innerHTML = this.phoneNumber;
  };

  // přidání pojištěnce the local storage
  function addInsuredToLocalStorage(insured) {
    let insuredList = JSON.parse(localStorage.getItem("insuredList")) || [];
    insuredList.push(insured);
    localStorage.setItem("insuredList", JSON.stringify(insuredList));
  }

  // vypsání pojištěnce z local storage
  function getInsuredFromLocalStorage() {
    let insuredList = JSON.parse(localStorage.getItem("insuredList")) || [];
    return insuredList.map(insuredData => new Insured(insuredData.firstName, insuredData.lastName, insuredData.age, insuredData.phoneNumber));
  }

  // vypsání pojištěnců v tabulce
  function displayAllInsured() {
    const insuredList = getInsuredFromLocalStorage();
    insuredList.forEach(insured => {
      insured.displayInTable();
    });
  }

  // přidej nového pojištěnce
  document.getElementById("addInsuredForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const age = parseInt(document.getElementById("age").value);
    const phoneNumber = document.getElementById("phoneNumber").value;

    if (firstName && lastName && age && phoneNumber) {
      const newInsured = new Insured(firstName, lastName, age, phoneNumber);
      addInsuredToLocalStorage(newInsured);
      newInsured.displayInTable();

      // Reset the form
      document.getElementById("addInsuredForm").reset();
    } 
  });

  // Display all Insured Persons in the table on page load
  displayAllInsured();
window.onload = function () {
  var listingElements = ["apple", "orange"];
  var storeElements = [];

  var isInAscending = true;

  // логика JS, не связана с DOM
  function addToStoreElements(element) {
    var elementPosition = listingElements.indexOf(element);
    if (elementPosition > -1) {
      storeElements.push(element);
      listingElements.splice(elementPosition, 1);
    }
  }

  function addToListingElements(element) {
    var elementPosition = storeElements.indexOf(element);
    if (elementPosition > -1) {
      listingElements.push(element);
      storeElements.splice(elementPosition, 1);
    }
  }

  function deleteFromElements(elements, element) {
    var elementPosition = elements.indexOf(element);
    if (elementPosition > -1) {
      elements.splice(elementPosition, 1);
    }
  }

  function newAddToListingElements(element) {
    var elementPosition = storeElements.indexOf(element);
    if (elementPosition > -1) {
      return -1;
    }
    elementPosition = listingElements.indexOf(element);
    if (elementPosition > -1) {
      return -1;
    }
    listingElements.push(element);
    return 1;
  }

  function sortIndescending(a, b) {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  }

  function sortElements() {
    if (isInAscending) {
      listingElements.sort(sortIndescending);
      storeElements.sort(sortIndescending);
      isInAscending = false;
    } else {
      listingElements.sort();
      storeElements.sort();
      isInAscending = true;
    }
  }

  function renameElement(element, newValue) {
    if (newValue.length === 0) {
      if (confirm("You new sting is empty, is ok?")) {
        var elementPosition = storeElements.indexOf(element);
        if (elementPosition > -1) {
          storeElements[elementPosition] = newValue;
        }
        elementPosition = listingElements.indexOf(element);
        if (elementPosition > -1) {
          listingElements[elementPosition] = newValue;
        }
      }
    } else {
      var elementPosition = storeElements.indexOf(element);
      if (elementPosition > -1) {
        storeElements[elementPosition] = newValue;
      }
      elementPosition = listingElements.indexOf(element);
      if (elementPosition > -1) {
        listingElements[elementPosition] = newValue;
      }
    }
  }

  // updateUI берет данные из массивов и занимается вставкой
  function updateUI() {
    var storeSelect = document.querySelector(".store-select");
    var listingSelect = document.querySelector(".listing-select");
    storeSelect.innerHTML = "";
    listingSelect.innerHTML = "";

    for (var i = 0; i < listingElements.length; i++) {
      var newOption = document.createElement("option");
      newOption.innerText = listingElements[i];
      listingSelect.append(newOption);
    }

    for (var i = 0; i < storeElements.length; i++) {
      var newOption = document.createElement("option");
      newOption.innerText = storeElements[i];
      storeSelect.append(newOption);
    }
  }

  // регистрируем события
  var addStoreButton = document.querySelector("#add-store-button");

  addStoreButton.onclick = function () {
    var selectedOption = document.querySelector(
      ".listing-select option:checked"
    );
    if (selectedOption !== null) {
      addToStoreElements(selectedOption.innerText);
    }
    updateUI();
  };

  var addListingButton = document.querySelector("#add-listing-button");

  addListingButton.onclick = function () {
    var selectedOption = document.querySelector(".store-select option:checked");
    if (selectedOption !== null) {
      addToListingElements(selectedOption.innerText);
    }
    updateUI();
  };

  var deleteButton = document.querySelector("#delete-button");

  deleteButton.onclick = function () {
    var selectedOption = document.querySelector(".store-select option:checked");
    if (selectedOption !== null) {
      deleteFromElements(storeElements, selectedOption.innerText);
    } else {
      selectedOption = document.querySelector(".listing-select option:checked");
      if (selectedOption !== null) {
        deleteFromElements(listingElements, selectedOption.innerText);
      }
    }
    updateUI();
  };

  var newElementButton = document.querySelector("#new-element-button");

  newElementButton.onclick = function () {
    var newElement = prompt("Adding new element");
    if (newElement !== null) {
      if (newElement.length === 0) {
        if (confirm("You string is empty, is ok?")) {
          var result = newAddToListingElements(newElement);
          if (result === -1) {
            alert("This element already exists");
          }
        }
      } else {
        var result = newAddToListingElements(newElement);
        if (result === -1) {
          alert("This element already exists");
        }
      }
      updateUI();
    }
  };

  var sortButton = document.querySelector("#sort-button");

  sortButton.onclick = function () {
    sortElements();
    updateUI();
  };

  var renameButton = document.querySelector("#rename-button");

  renameButton.onclick = function () {
    var selectedOption = document.querySelector(".store-select option:checked");
    if (selectedOption === null) {
      selectedOption = document.querySelector(".listing-select option:checked");
    }
    if (selectedOption !== null) {
      var newValue = prompt(
        "Rename old element<" + selectedOption.innerText + ">"
      );
      if (newValue !== null) {
        renameElement(selectedOption.innerText, newValue);
      }
    }

    updateUI();
  };
};

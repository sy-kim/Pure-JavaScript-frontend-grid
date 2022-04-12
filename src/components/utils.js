let debugStatus = false;

export function numberFormat(number) {
  return new Intl.NumberFormat("ko-KR", {
    maximumSignificantDigits: 3,
  }).format(number);
}

/**
 * @param {*} number
 * @returns
 */
export function phoneNumberToStringFormat(number) {
  let majorNumber = number.substr(0, 3);
  let midNumber = number.substr(3, 4);
  let lastNumber = number.substr(7, 4);

  return majorNumber + "-" + midNumber + "-" + lastNumber;
}

/**
 * @param {*} email
 * @returns
 */
export function emailValidation(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return email;
  }

  return "email validation error";
}

export function elementValidationCheck(object) {
  if (object === undefined || object === "") return false;
  return true;
}

/**
 * HTML table sort function
 * @param {*} table
 * @param {*} col
 * @param {*} direction
 * @param {*} type
 */

export function sortTable(table, column, dir, sortType) {
  // log
  if (debugStatus) {
    console.log("Table : ", table);
    console.log("Column : ", column);
    console.log("Direction : ", dir);
    console.log("Type : ", sortType);
  }

  /**
   * Comapre two table rows based on current settings
   *
   * @param {*} RowA A TR DOM object
   * @param {*} RowB B TR DOM object
   * @returns {number} 1 of RowA is greater,
   *                  -1 if RowB,
   *                   0 if equal
   */
  sortTable.compareRow = function (RowA, RowB) {
    let valA, valB;

    valA = sortTable[sortTable.sortFunc](RowA.cells[sortTable.sortCol]);
    valB = sortTable[sortTable.sortFunc](RowB.cells[sortTable.sortCol]);

    if (sortType == "string") {
      valA = sortTable[sortTable.sortFunc](RowA.cells[sortTable.sortCol]);
      valB = sortTable[sortTable.sortFunc](RowB.cells[sortTable.sortCol]);
    } else if ((sortType = "number")) {
      valA = parseInt(sortTable[sortTable.sortFunc](RowA.cells[sortTable.sortCol]));
      valB = parseInt(sortTable[sortTable.sortFunc](RowB.cells[sortTable.sortCol]));
    }

    return valA == valB ? 0 : sortTable.sortDir * (valA > valB ? 1 : -1);
  };

  /**
   * Strip all HTML, no exceptions
   * @param html
   * @returns {string}
   */

  sortTable.stripTags = function (html) {
    return html.replace(/<\/?[a-z][a-z0-9]*\b[^>]*>/gi, "");
  };

  /**
   * Helper function that converts a table cell (TD) to a comarable value
   * Converts innerHTML to a JS Number object
   */

  sortTable.number = function (Cell) {
    return Number(sortTable.stripTags(Cell.innerHTML).replace(/[^-\d.]/g, ""));
  };

  /**
   * Helper function that converts a table cell (TD) to a comparable value
   * Converts innerHTML to a lower case string for insensitive compare
   *
   * @param Cell A TD DOM object
   * @returns {String}
   */
  sortTable.string = function (Cell) {
    return sortTable.stripTags(Cell.innerHTML).toLowerCase();
  };

  /**
   * Helper function that converts a table cell (TD) to a comparable value
   *
   * @param Cell A TD DOM object
   * @returns {String}
   */
  sortTable.raw = function (Cell) {
    return Cell.innerHTML;
  };

  /**
   * Helper function that converts a table cell (TD) to a comparable value
   * Captures the last space-delimited token from innerHTML
   *
   * @param Cell A TD DOM object
   * @returns {String}
   */
  sortTable.last = function (Cell) {
    return sortTable.stripTags(Cell.innerHTML).split(" ").pop().toLowerCase();
  };

  /**
   * Helper function that converts a table cell (TD) to a comparable value
   * Captures the value of the first childNode
   *
   * @param Cell A TD DOM object
   * @returns {String}
   */
  sortTable.input = function (Cell) {
    for (var i = 0; i < Cell.children.length; i++) {
      if ("object" == typeof Cell.children[i] && "undefined" != typeof Cell.children[i].value) {
        return Cell.children[i].value.toLowerCase();
      }
    }

    return sortTable.string(Cell);
  };

  /**
   * Helper function that prevents sorting by always returning null
   *
   * @param Cell A TD DOM object
   * @returns null
   */
  sortTable.none = function (Cell) {
    return null;
  };

  /**
   * Return the click handler appropriate to the specified Table and column
   *
   * @param Table Table to sort
   * @param col   Column to sort by
   * @returns {Function} Click Handler
   */
  sortTable.getClickHandler = function (Table, col) {
    return function () {
      sortTable(Table, col);
    };
  };

  switch (dir) {
    case "asc":
      sortTable.sortDir = 1;
      break;
    case "desc":
      sortTable.sortDir = -1;
      break;
  }

  sortTable.sortCol = column;
  sortTable.sortFunc = "string";

  // sort function
  let rows = [];
  let TBody = table.tBodies[0];

  for (let i = 0; i < TBody.rows.length; i++) {
    rows[i] = TBody.rows[i];
  }

  rows.sort(sortTable.compareRow);

  while (TBody.firstChild) {
    TBody.removeChild(TBody.firstChild);
  }

  for (let i = 0; i < rows.length; i++) {
    TBody.appendChild(rows[i]);
  }
}

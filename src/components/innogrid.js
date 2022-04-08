/**
 * innogrid table grid project
 */

import { numberFormat, phoneNumberToStringFormat, emailValidation, elementValidationCheck } from "./utils";
import { resizableGrid } from "./resizableTable";
import { sortTable } from "./sortTable";
/**
 * Genetate table
 * @param {*} table
 * @param {*} rowData
 * @param {*} gridConfiguration
 * @param {*} rowSelectCallback
 * @returns
 */

const defaultConfig = {
  perPage: 10,
  perpageSelect: [5, 10, 20, 30],

  sortable: true,
  sortDirectionAsc: true,
  searchable: true,

  // Pagination set
  nextPrev: true,

  // header default witdh
  headerMouseOverColor: "#e3eefb",
  headerBackgroundColor: "#f8f9fb",
  headerBorderColor: "#e5e6e9", // "LightGray"
  htMinWidth: "50px",
  htWidth: "100px",

  // column text Align default left
  textAlign: "left",

  // row cell padding
  cellPaddingLeft: "5px",
  cellPaddingRight: "5px",
};

var each = function (arr, fn, scope) {
  var n;
  if (isObject(arr)) {
    for (n in arr) {
      if (Object.prototype.hasOwnProperty.call(arr, n)) {
        fn.call(scope, arr[n], n);
      }
    }
  } else {
    for (n = 0; n < arr.length; n++) {
      fn.call(scope, arr[n], n);
    }
  }
};

var isObject = function (val) {
  return Object.prototype.toString.call(val) === "[object Object]";
};

var classList = {
  add: function (s, a) {
    if (s.classList) {
      s.classList.add(a);
    } else {
      if (!classList.contains(s, a)) {
        s.className = s.className.trim() + " " + a;
      }
    }
  },
  remove: function (s, a) {
    if (s.classList) {
      s.classList.remove(a);
    } else {
      if (classList.contains(s, a)) {
        s.className = s.className.replace(new RegExp("(^|\\s)" + a.split(" ").join("|") + "(\\s|$)", "gi"), " ");
      }
    }
  },
  contains: function (s, a) {
    if (s)
      return s.classList
        ? s.classList.contains(a)
        : !!s.className && !!s.className.match(new RegExp("(\\s|^)" + a + "(\\s|$)"));
  },
};

export function innoGrid(table, rowData, gridConf, foot) {
  if (table === undefined) {
    console.error("Grid table is empty!");
    return;
  }
  if (gridConf.gridColumnDef === undefined) {
    console.error("Grid column definition not found!");
    return;
  }
  if (rowData.length === 0 && rowData === undefined) {
    console.error("Grid row data is empty!");
    return;
  }

  // Paginator default true
  if (foot === undefined) {
    foot = true;
  }

  let processConfig = merge(defaultConfig, gridConf);
  const grid = new Grid(table, processConfig, rowData);
  grid.initial();

  // Create table header
  let tHead = grid.createHeader();
  //tHead.style.borderTop = "1px solid black";
  // Insert row
  let tr = tHead.insertRow();

  tr.style.height = "38px";
  tr.style.margin = "0 auto";

  tr.style.borderRight = `1px solid #989ca2`;

  let trTotalCount = 0;

  processConfig.gridColumnDef.forEach((headerElement) => {
    let th = document.createElement("th");

    // header th font
    th.style.fontSize = "14px";
    // header drap and select none
    th.style.userSelect = "none";

    th.style.borderLeft = `1px solid #989ca2`;
    th.style.borderTop = "1px solid #0a2348";
    th.style.borderBottom = `1px solid #989ca2`;
    th.style.textAlign = "center";
    th.style.backgroundColor = processConfig.gridStyle.headerBackgroundColor;

    headerElement.width === undefined
      ? (th.style.width = processConfig.htMinWidth)
      : (th.style.width = headerElement.width);

    if (headerElement.sortable !== undefined || headerElement.sortable) {
      th.className = "table-sorter-normal";
    }

    th.innerText = headerElement.header;

    if (headerElement.hide) {
      th.style.display = "none";
    }

    tr.append(th);

    th.addEventListener("mouseover", function (event) {
      th.style.backgroundColor = processConfig.headerMouseOverColor;
    });
    th.addEventListener("mouseleave", function (event) {
      th.style.backgroundColor = processConfig.gridStyle.headerBackgroundColor;
    });

    th.addEventListener("click", function (event) {
      let sortDirection = "asc";
      let sortType = "string"; // default string
      // header element sortable and filter state check
      if (headerElement.sortable !== undefined || headerElement.sortable) {
        processConfig.sortDirectionAsc = !processConfig.sortDirectionAsc;

        switch (processConfig.sortDirectionAsc) {
          case true:
            sortDirection = "asc";
            th.className = "asc-table-sorter";
            break;
          case false:
            sortDirection = "desc";
            th.className = "desc-table-sorter";
            break;
          default:
            sortDirection = "";
            th.className = "table-sorter-normal";
            break;
        }

        if (headerElement.type)
          switch (headerElement.type) {
            case "number":
              sortType = "number";
              break;

            default:
              sortType = "string";
              break;
          }
        sortTable(table, th.cellIndex, sortDirection, sortType);
      }
    });
  });

  let tBody = document.createElement("TBODY");

  rowData.forEach((rowElement) => {
    /**
     * table row data loop
     */

    let row = document.createElement("TR");
    row.style.userSelect = "none";
    row.style.whiteSpace = "nowrap";
    row.style.height = "34px";

    row.style.borderRight = "1px solid #f8f8fb";

    tBody.appendChild(row);

    // Grid TR mouse over event
    row.addEventListener("mouseover", function (event) {
      gridRowMouseOver(row);
    });
    // Grid TR mouse leave event
    row.addEventListener("mouseout", function (e) {
      gridRowMouseOut(row);
    });

    row.addEventListener("dblclick", function (event) {
      let rowChildren = row.children;
      console.log("row cells : ", rowChildren[0]);
    });

    processConfig.gridColumnDef.forEach((column) => {
      if (!column.hide) {
        let cell = row.insertCell();
        cell.style.border = `1px solid ${processConfig.gridStyle.headerBorderColor}`;

        // cell item left and right padding (좌우 여백)
        cell.style.paddingRight = "15px";
        cell.style.paddingLeft = processConfig.paddingLeft;
        // cell item left and right padding end
        // Cell Item
        let cellItem = document.createElement("div");
        cellItem.style.marginLeft = "10px";
        cellItem.style.fontSize = "14px";

        if (column.type !== undefined) {
          switch (column.type) {
            case "html":
              cellItem.innerHTML = rowElement[column.item];
              break;
            case "sample":
              /*
              console.log("원천데이터 : ", rowElement);
              console.log("키 데이터 : ", column.item);
              
              
              let keys = column.item.split(".");

              console.log("keys : ", keys);
              console.log(rowElement);
              let obj = rowElement;
              keys.forEach((key) => {
                obj = obj[key];
              });
              console.log(obj); */

              //cellItem.innerHTML = rowElement[column.item];
              break;
            case "email":
              cellItem.innerHTML = emailValidation(rowElement[column.item]);
              break;
            case "phone":
              cellItem.innerHTML = phoneNumberToStringFormat(rowElement[column.item]);
              break;
            case "numberLocale":
              cellItem.innerHTML = numberFormat(rowElement[column.item]);
              break;
            case "text":
              cellItem.innerText = rowElement[column.item];
              break;
            case "string":
              cellItem.innerText = rowElement[column.item];
              break;
            default:
              cellItem.innerHTML = rowElement[column.item];
              break;
          }
        } else {
          // column.type undefined
          cellItem.innerHTML = rowElement[column.item];
        }

        column.textAlign === undefined
          ? (cellItem.style.textAlign = processConfig.textAlign)
          : (cellItem.style.textAlign = column.textAlign);

        column.textColor === undefined ? (cellItem.style.color = "black") : (cellItem.style.color = column.textColor);

        cell.appendChild(cellItem);
      }
    });
  });

  table.appendChild(tBody);
  resizableGrid(table);

  // paginator start
  const paginatorConfig = {
    table: table,
    box: processConfig.gridStyle.paginatorElement,
    row_per_page: 10, // default row per page
  };

  if (processConfig.gridStyle.pagination !== undefined && processConfig.gridStyle.pagination) {
    paginator(paginatorConfig);
  }
  // paginator end
}

class Grid {
  constructor(table, configuration, rowData) {
    this.table = table;
    this.configuration = configuration;
    this.rowData = rowData;
  }

  initial() {
    let NotoSansKRBlackFont = new FontFace("NotoSansKR-Regular", "url(fonts/NotoSansKR-Regular.otf)");
    let NotoSansKRLightFont = new FontFace("NotoSansKR-Light", "url(fonts/NotoSansKR-Light.otf)");
    let NotoSansKRMediumFont = new FontFace("NotoSansKR-Medium", "url(fonts/NotoSansKR-Medium.otf)");
    // Font load
    NotoSansKRBlackFont.load()
      .then(function (loaded_face) {
        document.fonts.add(loaded_face);
        // Font document.body set
        document.body.style.fontFamily = '"NotoSansKR-Regular",Arial';
      })
      .catch(function (error) {
        console.error("Font load error!");
      });

    NotoSansKRLightFont.load()
      .then(function (loaded_face) {
        document.fonts.add(loaded_face);
        //document.body.style.fontFamily = '"NotoSansKR-Light"';
      })
      .catch(function (error) {
        console.error("Font load error!");
      });
    NotoSansKRMediumFont.load()
      .then(function (loaded_face) {
        document.fonts.add(loaded_face);
        // document.body.style.fontFamily = '"NotoSansKR-Medium"';
      })
      .catch(function (error) {
        console.error("Font load error!");
      });

    if (this.configuration.gridStyle.search && this.configuration.gridStyle.searchElement !== undefined) {
      let searchBlock = this.configuration.gridStyle.searchElement;

      searchBlock.style.display = "inline-flex";
      searchBlock.style.border = "1px solid black";
      this.configuration.gridStyle.searchPosition === undefined
        ? (searchBlock.style.float = "right")
        : (searchBlock.style.float = this.configuration.gridStyle.searchPosition);

      searchBlock.style.float = "right";
      searchBlock.style.marginBottom = "5px";
      searchBlock.style.width = "400px";
      searchBlock.style.height = "30px";

      let searchLabel = document.createElement("div");
      searchLabel.style.diaplay = "inline-block";
      searchLabel.style.marginLeft = "10px";

      let searchCaretDownIcon = new Image(16, 16);
      searchCaretDownIcon.src = "images/caret-down.svg";
      searchCaretDownIcon.style.float;
      searchCaretDownIcon.style.marginTop = "6px";
      searchCaretDownIcon.style.marginLeft = "8px";
      searchCaretDownIcon.style.verticalAlign = "middle";

      searchCaretDownIcon.addEventListener("click", function (event) {
        console.log();
      });

      searchLabel.innerText = "필터";
      searchLabel.style.fontSize = "14px";
      searchLabel.style.marginTop = "3px";
      searchLabel.style.verticalAlign = "middle";

      let searchSelect = document.createElement("select");

      let searchOption = new Option("option1", "option1Value");

      searchBlock.appendChild(searchLabel);
      searchBlock.appendChild(searchCaretDownIcon);
    }

    window.addEventListener
      ? window.addEventListener("load", sortTable.init, false)
      : window.attachEvent && window.attachEvent("onload", sortTable.init);
  }

  createHeader() {
    let tHead = this.table.createTHead();
    return tHead;
  }

  getTotalCount() {
    return this.rowData.length;
  }

  /**
   * get th column index
   * @param {*} column
   * @returns
   */
  getCellIndex(column) {
    return column.cellIndex;
  }
}

let oldBackgroundColor;
function gridRowMouseOver(row) {
  oldBackgroundColor = row.style.backgroundColor;
  row.style.backgroundColor = "#e3eefb";
  row.style.border = "1px #f8f9fb solid";
  row.style.borderRadius = "5px 2px 2px 5px";
}
function gridRowMouseOut(row) {
  row.style.backgroundColor = oldBackgroundColor;
  row.style.border = "";
}

/*****************************************************
 * Paginator Function                                *
 *****************************************************/
function paginator(config) {
  /*
   * config : {
   *     get_rows : function used to select rows to do pagination on
   *         If no function is provided, checks for a config.table element and looks for rows in there to page
   *
   *     box : Empty element that will have page buttons added to it
   *         If no config.box is provided, but a config.table is, then the page buttons will be added using the table
   *
   *     table : table element to be paginated
   *         not required if a get_rows function is provided
   *
   *     rows_per_page : number of rows to display per page
   *         default number is 10
   *
   *     page: page to display
   *         default page is 1
   *
   *     box_mode: "list", "buttons", or function. determines how the page number buttons are built.
   *         "list" builds the page index in list format and adds class "pagination" to the ul element. Meant for use with bootstrap
   *         "buttons" builds the page index out of buttons
   *         if this field is a function, it will be passed the config object as its only param and assumed to build the page index buttons
   *
   *     page_options: false or [{text: , value: }, ... ] used to set what the dropdown menu options are available, resets rows_per_page value
   *         false prevents the options from being displayed
   *         [{text: , value: }, ... ] allows you to customize what values can be chosen, a value of 0 will display all the table's rows.
   *         the default setup is
   *           [
   *               { value: 5,  text: '5'   },
   *               { value: 10, text: '10'  },
   *               { value: 20, text: '20'  },
   *               { value: 50, text: '50'  },
   *               { value: 100,text: '100' },
   *               { value: 0,  text: 'All' }
   *           ]
   *
   *     active_class: set the class for page buttons to have when active.
   *          defaults to "active"
   *
   *     disable: true or false, shows all rows of the table and hides pagination controlls if set to true.
   *
   *     tail_call: function to be called after paginator is done.
   *
   * }
   */
  // throw errors if insufficient parameters were given
  if (typeof config != "object") throw "Paginator was expecting a config object!";
  if (typeof config.get_rows != "function" && !(config.table instanceof Element))
    throw "Paginator was expecting a table or get_row function!";

  // get/set if things are disabled
  if (typeof config.disable == "undefined") {
    config.disable = false;
  }

  // get/make an element for storing the page numbers in
  var box;
  if (!(config.box instanceof Element)) {
    config.box = document.createElement("div");
  }
  box = config.box;
  box.style.display = "flex";
  // box.style.justifyContent = "center";
  box.style.justifyContent = "right";

  // get/make function for getting table's rows
  if (typeof config.get_rows != "function") {
    config.get_rows = function () {
      var table = config.table;
      var tbody = table.getElementsByTagName("tbody")[0] || table;

      // get all the possible rows for paging
      // exclude any rows that are just headers or empty
      let children = tbody.children;
      var trs = [];
      for (var i = 0; i < children.length; i++) {
        if (children[i].nodeName.toLowerCase() === "tr") {
          if (children[i].getElementsByTagName("td").length > 0) {
            trs.push(children[i]);
          }
        }
      }
      return trs;
    };
  }

  var get_rows = config.get_rows;
  var trs = get_rows();

  // get/set rows per page
  if (typeof config.rows_per_page == "undefined") {
    var selects = box.getElementsByTagName("select");
    if (typeof selects != "undefined" && selects.length > 0 && typeof selects[0].selectedIndex != "undefined") {
      config.rows_per_page = selects[0].options[selects[0].selectedIndex].value;
    } else {
      config.rows_per_page = 10;
    }
  }
  var rows_per_page = config.rows_per_page;

  // get/set current page
  if (typeof config.page == "undefined") {
    config.page = 1;
  }
  var page = config.page;

  // get page count
  var pages = rows_per_page > 0 ? Math.ceil(trs.length / rows_per_page) : 1;

  // check that page and page count are sensible values
  if (pages < 1) {
    pages = 1;
  }
  if (page > pages) {
    page = pages;
  }
  if (page < 1) {
    page = 1;
  }
  config.page = page;

  // hide rows not on current page and show the rows that are
  for (var i = 0; i < trs.length; i++) {
    if (typeof trs[i]["data-display"] == "undefined") {
      trs[i]["data-display"] = trs[i].style.display || "";
    }
    if (rows_per_page > 0) {
      if (i < page * rows_per_page && i >= (page - 1) * rows_per_page) {
        trs[i].style.display = trs[i]["data-display"];
      } else {
        // Only hide if pagination is not disabled
        if (!config.disable) {
          trs[i].style.display = "none";
        } else {
          trs[i].style.display = trs[i]["data-display"];
        }
      }
    } else {
      trs[i].style.display = trs[i]["data-display"];
    }
  }

  // page button maker functions
  config.active_class = config.active_class || "active";
  if (typeof config.box_mode != "function" && config.box_mode != "list" && config.box_mode != "buttons") {
    config.box_mode = "button";
  }

  if (typeof config.box_mode == "function") {
    config.box_mode(config);
  } else {
    var make_button;
    if (config.box_mode == "list") {
      make_button = function (symbol, index, config, disabled, active) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#";
        a.innerHTML = symbol;
        a.addEventListener(
          "click",
          function (event) {
            event.preventDefault();
            this.parentNode.click();
            return false;
          },
          false
        );
        li.appendChild(a);

        var classes = [];
        if (disabled) {
          classes.push("disabled");
        }
        if (active) {
          classes.push(config.active_class);
        }
        li.className = classes.join(" ");
        li.addEventListener(
          "click",
          function () {
            if (this.className.split(" ").indexOf("disabled") == -1) {
              config.page = index;
              paginator(config);
            }
          },
          false
        );
        return li;
      };
    } else {
      make_button = function (symbol, index, config, disabled, active) {
        var button = document.createElement("button");
        button.style.width = "30px";
        button.style.fontSize = "14px";
        button.style.border = `1px solid #e5e6e9`;
        button.style.borderRadius = "2px 2px 2px 2px";
        button.innerHTML = symbol;

        button.addEventListener("mouseover", function () {
          button.style.backgroundColor = "#e3eefb";
        });
        button.addEventListener("mouseleave", function () {
          button.style.backgroundColor = "";
        });

        button.addEventListener(
          "click",
          function (event) {
            event.preventDefault();
            if (this.disabled != true) {
              config.page = index;
              paginator(config);
            }
            return false;
          },
          false
        );
        if (disabled) {
          button.disabled = true;
        }
        if (active) {
          button.className = config.active_class;
        }
        return button;
      };
    }

    // make page button collection

    var page_box = document.createElement(config.box_mode == "list" ? "ul" : "div");
    page_box.style.display = "inline-block";

    if (config.box_mode == "list") {
      page_box.className = "pagination";
    }

    var left = make_button("&laquo;", page > 1 ? page - 1 : 1, config, page == 1, false);
    page_box.appendChild(left);

    for (var i = 1; i <= pages; i++) {
      var li = make_button(i, i, config, false, page == i);
      page_box.appendChild(li);
    }

    var right = make_button("&raquo;", pages > page ? page + 1 : page, config, page == pages, false);
    page_box.appendChild(right);
    if (box.childNodes.length) {
      while (box.childNodes.length > 1) {
        box.removeChild(box.childNodes[0]);
      }
      box.replaceChild(page_box, box.childNodes[0]);
    } else {
      box.appendChild(page_box);
    }
  }

  // make rows per page selector
  if (!(typeof config.page_options == "boolean" && !config.page_options)) {
    if (typeof config.page_options == "undefined") {
      config.page_options = [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 20, text: "20" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
        { value: 0, text: "All" },
      ];
    }
    var options = config.page_options;
    var select = document.createElement("select");

    select.style.fontSize = "14px";
    select.style.height = "30px";

    for (var i = 0; i < options.length; i++) {
      var option = document.createElement("option");
      option.style.fontSize = "14px";
      option.value = options[i].value;
      option.text = options[i].text;
      select.appendChild(option);
    }
    select.value = rows_per_page;
    select.addEventListener(
      "change",
      function () {
        config.rows_per_page = this.value;
        paginator(config);
      },
      false
    );
    box.appendChild(select);
  }

  // status message
  var stat = document.createElement("span");
  stat.innerHTML =
    "On page " +
    page +
    " of " +
    pages +
    ", showing rows " +
    ((page - 1) * rows_per_page + 1) +
    " to " +
    (trs.length < page * rows_per_page || rows_per_page == 0 ? trs.length : page * rows_per_page) +
    " of " +
    trs.length;
  //box.appendChild(stat);

  // hide pagination if disabled
  if (config.disable) {
    if (typeof box["data-display"] == "undefined") {
      box["data-display"] = box.style.display || "";
    }
    box.style.display = "none";
  } else {
    if (box.style.display == "none") {
      box.style.display = box["data-display"] || "";
    }
  }

  // run tail function
  if (typeof config.tail_call == "function") {
    config.tail_call(config);
  }

  return box;
}

/**
 * deep merge to object return update
 * @param {*} current
 * @param {*} update
 * @returns
 */
export function merge(current, update) {
  Object.keys(current).forEach(function (key) {
    if (update.hasOwnProperty(key) && typeof update[key] === "object" && !(update[key] instanceof Array)) {
      that._merge(current[key], update[key]);
    } else if (!update.hasOwnProperty(key)) {
      update[key] = current[key];
    }
  });
  return update;
}

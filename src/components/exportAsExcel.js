import { generateWorksheet } from "./excelExport/generateWorksheet";

let debugStatus = true;

/**
 * @param {*} table Object
 * @param {*} fileName String
 */
export function exportAsExcel(tableId, fileName) {
  // Get browser agent type
  let userAgent = window.navigator.userAgent;

  if (debugStatus) {
    console.log("Table ID : ", tableId);
    console.log("Output file name is : ", fileName);
  }

  let table = document.getElementById(tableId);

  let tableText = "<table border='2px'><tr>";
  // Read table data and append to tableText
  let tableBody = table.getElementsByTagName("tbody")[0];

  for (var index = 0; index < tableBody.rows.length; index++) {
    tableText = tableText + tableBody.rows[index].innerHTML + "</tr>";
  }

  tableText = tableText + "</table>"; // table close
  tableText = tableText.replace(/<a[^>]*>|<\/a>/g, ""); //removes links embedded in <td>
  tableText = tableText.replace(/<img[^>]*>/gi, ""); //removes images embeded in <td>
  tableText = tableText.replace(/<input[^>]*>|<\/input>/gi, ""); //removes input tag elements

  console.log("Table text : ", tableText);
  const schema = [
    {
      column: "Name",
      type: String,
      value: (student) => student.name,
      width: 20,
    },
    {
      column: "Date of Birth",
      type: Date,
      format: "mm/dd/yyyy",
      value: (student) => student.dateOfBirth,
      width: 14,
    },
    {
      column: "Cost",
      type: Number,
      format: "#,##0.00",
      value: (student) => student.cost,
      width: 12,
    },
    {
      column: "Paid",
      type: Boolean,
      value: (student) => student.paid,
    },
  ];

  writeXlsxFile(tableText, { schema, fileName: "with-schema.xlsx" });
}

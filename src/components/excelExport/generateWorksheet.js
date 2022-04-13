/**
 *   generate Work sheet
 */

export function generateWorksheet(
  data,
  {
    schema,
    columns,
    headerStyle,
    getStyle,
    getSharedString,
    customFont,
    dateFormat,
    orientation,
    stickyRowsCount,
    stickyColumnsCount,
    sheetId,
  }
) {
  if (schema) {
    if (!Array.isArray(data)) {
      throw new TypeError("Expected an array of objects");
    }
  } else {
    if (!Array.isArray(data)) {
      throw new TypeError("Expected an array of arrays");
    }
    if (data.length > 0) {
      if (!Array.isArray(data[0])) {
        throw new TypeError("Expected an array of arrays");
      }
    }
  }

  return WORKSHEET_TEMPLATE.replace(
    "{data}",
    generateRows(data, {
      schema,
      headerStyle,
      getStyle,
      getSharedString,
      customFont,
      dateFormat,
    })
  )
    .replace("{views}", generateViews({ stickyRowsCount, stickyColumnsCount }))
    .replace("{columnsDescription}", generateColumnsDescription({ schema, columns }))
    .replace("{mergedCellsDescription}", generateMergedCellsDescription(data, { schema }))
    .replace("{layout}", generateLayout({ sheetId, orientation }));
}

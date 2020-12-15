import React from "react";
import clone from "clone";
import PropTypes from "prop-types";

export default class TableDragSelect extends React.Component {

  static defaultProps = {
    value: [],
    maxRows: Infinity,
    maxColumns: Infinity,
    onSelectionStart: () => { },
    onInput: () => { },
    onChange: () => { }
  };

  state = {
    selectionStarted: false,
    startRow: null,
    startColumn: null,
    endRow: null,
    endColumn: null,
    addMode: null
  };

  componentDidMount = () => {
    console.log("table component mounting")
    window.addEventListener("mouseup", this.handleTouchEndWindow);
    window.addEventListener("touchend", this.handleTouchEndWindow);
  };

  componentWillUnmount = () => {
    console.log("table component unmounting")
    window.removeEventListener("mouseup", this.handleTouchEndWindow);
    window.removeEventListener("touchend", this.handleTouchEndWindow);
  };

  render = () => {
    return (
      <div className="table-drag-select-container">
        <table className="table-drag-select" onMouseLeave = {this.handleMouseLeave}>
          <thead>
            {this.renderHeader()}
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  };

  renderHeader = () => {
    let header = []
    if (this.props.days[0].length === 3)
      this.props.days.forEach((day, i) => header.push(<th key = {i}>{day}</th>))
    else {
      this.props.days.forEach((day, i) => header.push(<th key = {i}>{this.dateHeader(day)}</th>))
    }
    return <tr className="table-header-day">{header}</tr>
  }

  dateHeader = (day) => {
    return (
      <div>
        <div className="table-header-day">
          {day.format('ddd')}
        </div>
        <div className="table-header-date">
          {day.format('MMM D, y')}
        </div>
      </div>
    )
  }

  renderRows = () =>
    React.Children.map(this.props.children, (tr, i) => {

      // if not header
      return (
        <tr key={i} {...tr.props}>
          {React.Children.map(tr.props.children, (cell, j) => {
            if (!this.props.editing || this.props.value === null) {
              return (
                <Cell
                  key={j}
                  onTouchStart={this.handleTouchStartCellViewing}
                  onTouchMove={this.handleTouchMoveCellViewing}
                  selected={false}
                  beingSelected={this.isCellBeingSelectedViewing(i, j)}
                  addMode={this.state.addMode}
                  color={this.props.colors[i][j]}
                  rowNum={i}
                  {...cell.props}
                >
                  {cell.props.children}
                </Cell>
              )
            }
            else {
              return (
                <Cell
                  key={j}
                  onTouchStart={this.handleTouchStartCellEditing}
                  onTouchMove={this.handleTouchMoveCellEditing}
                  selected={this.props.value[i][j]}
                  beingSelected={this.isCellBeingSelected(i, j)}
                  addMode={this.state.addMode}
                  color={this.props.colors[i][j]}
                  rowNum={i}
                  {...cell.props}
                >
                  {cell.props.children}
                </Cell>
              )
            }
          }
          )}
        </tr>
      )

    });

  handleTouchStartCellViewing = e => {
    //console.log("touch started", e)
    const isLeftClick = e.button === 0;
    const isTouch = e.type !== "mousedown";
    if (isLeftClick || isTouch) e.preventDefault();
  }

  handleTouchMoveCellViewing = e => {
    //console.log("touch moved", e)
    e.preventDefault()
    let { row, column } = eventToCellLocation(e);
    this.props.setCurrentCoords({row: row, col: column})
    if(this.state.addMode) this.setState({addMode: false})
  }

  handleMouseLeave = () => {
    console.log("mouse left")
    this.props.setCurrentCoords(null)
  }

  handleTouchStartCellEditing = e => {
    const isLeftClick = e.button === 0;
    const isTouch = e.type !== "mousedown";
    if (!this.state.selectionStarted && (isLeftClick || isTouch)) {
      e.preventDefault();
      let { row, column } = eventToCellLocation(e);
      this.props.onSelectionStart({ row, column });
      this.setState({
        selectionStarted: true,
        startRow: row,
        startColumn: column,
        endRow: row,
        endColumn: column,
        addMode: !this.props.value[row][column]
      });
    }
  };

  handleTouchMoveCellEditing = e => {
    if (this.state.selectionStarted) {
      e.preventDefault();
      let { row, column } = eventToCellLocation(e);
      const { startRow, startColumn, endRow, endColumn } = this.state;

      if (endRow !== row || endColumn !== column) {
        const nextRowCount =
          startRow === null && endRow === null
            ? 0
            : Math.abs(row - startRow) + 1;
        const nextColumnCount =
          startColumn === null && endColumn === null
            ? 0
            : Math.abs(column - startColumn) + 1;

        if (nextRowCount <= this.props.maxRows) {
          this.setState({ endRow: row });
        }

        if (nextColumnCount <= this.props.maxColumns) {
          this.setState({ endColumn: column });
        }
      }
    }
  };

  handleTouchEndWindow = e => {
    const isLeftClick = e.button === 0;
    const isTouch = e.type !== "mousedown";
    if (this.state.selectionStarted && (isLeftClick || isTouch)) {
      const value = clone(this.props.value);
      const minRow = Math.min(this.state.startRow, this.state.endRow);
      const maxRow = Math.max(this.state.startRow, this.state.endRow);
      for (let row = minRow; row <= maxRow; row++) {
        const minColumn = Math.min(
          this.state.startColumn,
          this.state.endColumn
        );
        const maxColumn = Math.max(
          this.state.startColumn,
          this.state.endColumn
        );
        for (let column = minColumn; column <= maxColumn; column++) {
          value[row][column] = this.state.addMode;
        }
      }
      this.setState({ selectionStarted: false });
      this.props.onChange(value);
    }
  };

  isCellBeingSelected = (row, column) => {
    const minRow = Math.min(this.state.startRow, this.state.endRow);
    const maxRow = Math.max(this.state.startRow, this.state.endRow);
    const minColumn = Math.min(this.state.startColumn, this.state.endColumn);
    const maxColumn = Math.max(this.state.startColumn, this.state.endColumn);

    return (
      this.state.selectionStarted &&
      (row >= minRow &&
        row <= maxRow &&
        column >= minColumn &&
        column <= maxColumn)
    );
  };

  isCellBeingSelectedViewing = (row, column) => {
     
    return (this.props.currentCoords &&
      (row === this.props.currentCoords.row &&
        column === this.props.currentCoords.col)
    )
  }
}


class Cell extends React.Component {
  // This optimization gave a 10% performance boost while drag-selecting
  // cells
  shouldComponentUpdate = nextProps =>
    this.props.beingSelected !== nextProps.beingSelected ||
    this.props.selected !== nextProps.selected || 
    this.props.color !== nextProps.color

  componentDidMount = () => {
    // We need to call addEventListener ourselves so that we can pass
    // {passive: false}
    this.td.addEventListener("touchstart", this.handleTouchStart, {
      passive: false
    });
    this.td.addEventListener("touchmove", this.handleTouchMove, {
      passive: false
    });
  };

  componentWillUnmount = () => {
    this.td.removeEventListener("touchstart", this.handleTouchStart);
    this.td.removeEventListener("touchmove", this.handleTouchMove);
  };

  render = () => {
    let {
      className = "",
      beingSelected,
      selected,
      onTouchStart,
      onTouchMove,
      addMode,
      color,
      rowNum,
      ...props
    } = this.props;

    let style = {backgroundColor: color}
    let selectedColor = "var(--highlight)", deselectedColor = "var(--alert)"

      className += " cell-enabled";
      if (beingSelected) {
        if (addMode) style.backgroundColor = "#24d1ce"
        else style.backgroundColor = deselectedColor
      }
      else if (selected) {
        //className += " cell-selected";
        style.backgroundColor = selectedColor
      }


    //console.log("color: ", style)

    if(rowNum % 4 === 0) {
      style.borderTop = "3px solid #e1e3e6"
    }
//e1e3e6
    return (
      <td
        ref={td => (this.td = td)}
        className={className}
        onMouseDown={this.handleTouchStart}
        onMouseMove={this.handleTouchMove}
        style={style}
        {...props}
      >
        {this.props.children || <span>&nbsp;</span>}
      </td>
    );
  };

  handleTouchStart = e => {
      this.props.onTouchStart(e);
  };

  handleTouchMove = e => {
      this.props.onTouchMove(e);
  };
}

// Takes a mouse or touch event and returns the corresponding row and cell.
// Example:
//
// eventToCellLocation(event);
// {row: 2, column: 3}
const eventToCellLocation = e => {
  let target;
  // For touchmove and touchend events, e.target and e.touches[n].target are
  // wrong, so we have to rely on elementFromPoint(). For mouse clicks, we have
  // to use e.target.
  if (e.touches) {
    const touch = e.touches[0];
    target = document.elementFromPoint(touch.clientX, touch.clientY);
  } else {
    target = e.target;
    while (target.tagName !== "TD") {
      target = target.parentNode;
    }
  }
  return {
    row: target.parentNode.rowIndex - 1,
    column: target.cellIndex
  };
};
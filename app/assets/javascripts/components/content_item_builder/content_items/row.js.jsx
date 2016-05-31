ContentItemBuilder.ContentItems.Row = React.createClass({

  propTypes: {
    onRowDelete: React.PropTypes.func.isRequired,
    onRowChange: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
    documentTargets: React.PropTypes.array.isRequired,
    mediaTypes: React.PropTypes.array.isRequired,
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    icon: React.PropTypes.string,
    thumbnail: React.PropTypes.string,
    type: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    presentationTarget: React.PropTypes.string,
    windowTarget: React.PropTypes.string,
    confirmUrl: React.PropTypes.string,
    canvasVisibility: React.PropTypes.string
  },

  removeHandler: function () {
    var index = React.findDOMNode(this.refs.index).value.trim();
    this.props.onRowDelete(Number(index));
  },

  tableChangeHandler: function (e) {
    var index = React.findDOMNode(this.refs.index).value.trim();

    var state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);

    this.props.onRowChange(Number(index), [e.target.id, e.target.value]);
  },

  render: function () {
    var documentTargets = this.props.documentTargets;
    var mediaTypes = this.props.mediaTypes;


    if (mediaTypes.length > 0) {
      return (
        <tr>
          <td><input ref="itemTitle" id="title" onChange={this.tableChangeHandler} defaultValue={this.props.title} type="text"></input></td>
          <td><input ref="itemText" id="text" onChange={this.tableChangeHandler} defaultValue={this.props.text} type="text"></input></td>
          <td><input ref="icon" id="icon" onChange={this.tableChangeHandler} defaultValue={this.props.icon && this.props.icon} type="text"></input></td>
          <td><input ref="thumbnail" id="thumbnail" onChange={this.tableChangeHandler} defaultValue={this.props.thumbnail && this.props.thumbnail} type="text"></input></td>
          <td>
            <select ref="itemType" id="type" onChange={this.tableChangeHandler}>
              {mediaTypes.map(function (value) {
                return <option key={value} value={value}>{value === 'CC' ? 'File Item' : value}</option>
              })};
            </select>
          </td>
          <td>
            <select ref="itemPresentTarget" id="presentationTarget" onChange={this.tableChangeHandler}>
              {documentTargets.map(function (value) {
                return <option key={value} value={value}>{value}</option>
              })};
            </select>
          </td>
          <td><input ref="itemWindowTarget" id="windowTarget" onChange={this.tableChangeHandler} defaultValue={this.props.itemWindowTarget} type="text"></input></td>
          <td><input ref="itemConfirmUrl" id="confirmUrl" onChange={this.tableChangeHandler} defaultValue={this.props.confirmUrl}
          type="text"></input></td>
          <td className="add-remove-col">
            <input type="hidden" ref="index" value={this.props.index}></input>
            <a href="#" onClick={this.removeHandler}>
              <span className="glyphicon glyphicon-minus remove-icon"></span>
            </a>
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td colSpan="6" style={{textAlign: 'center'}}>
          <strong>No Supported Types</strong>
        </td>
      </tr>
    );
  }

});

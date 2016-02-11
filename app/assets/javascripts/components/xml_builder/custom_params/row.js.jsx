XmlBuilder.CustomParams.Row = React.createClass({

  propTypes: {
    param_name: React.PropTypes.string,
    param_value: React.PropTypes.string,
    index: React.PropTypes.number.isRequired,
    onRowDelete: React.PropTypes.func.isRequired
  },

  removeHandler: function () {
    var index = React.findDOMNode(this.refs.index).value.trim();
    this.props.onRowDelete(Number(index));
  },

  render: function () {
    return (
      <tr>
        <td><input ref="paramName" name={"custom_params["+this.props.index+"][name]"} defaultValue={this.props.param_name} type="text"></input></td>
        <td><input ref="paramValue" name={"custom_params["+this.props.index+"][value]"} defaultValue={this.props.param_value} type="text"></input></td>
        <td className="add-remove-col">
          <input type="hidden" ref="index" value={this.props.index}></input>
          <a href="#" onClick={this.removeHandler}>
            <span className="glyphicon glyphicon-minus remove-icon"></span>
          </a>
        </td>
      </tr>
    );
  }

});
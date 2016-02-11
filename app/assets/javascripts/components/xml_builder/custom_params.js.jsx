XmlBuilder.CustomParams = React.createClass({

  propTypes: {
    initialCustomParams: React.PropTypes.array,
    onFormChange: React.PropTypes.func
  },

  getInitialState: function () {
    var initialCustomParams = this.props.initialCustomParams || [];
    return {customParams: initialCustomParams};
  },

  addRowHandler: function () {
    var customParams = this.state.customParams;
    customParams.push( {name: '', value: ''} );
    this.setState( {customParams: customParams} );
  },

  handleDelete: function (index) {
    var customParams = this.state.customParams;
    customParams.splice(index, 1);
    this.setState( {customParams: customParams, updateForm: true} );
  },

  componentDidUpdate(prevProps, prevState) {
    if(this.state.updateForm){
      this.props.onFormChange();
      this.setState( {updateForm: false} );
    }
  },

  render: function () {
    var customParams = this.state.customParams;
    var handleDelete = this.handleDelete;
    return (
      <div>
        <p>{this.props.children}</p>
        <table className="table table-condensed">
          <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th className="add-remove-col">
              <a onClick={this.addRowHandler} href="#">
                <span className="glyphicon glyphicon-plus add-icon"> </span>
              </a>
            </th>
          </tr>
          </thead>
          <tbody>
          {customParams.map(function (customParam, index) {
            return <XmlBuilder.CustomParams.Row onRowDelete={handleDelete} key={index} index={index} paramName={customParam.name} paramValue={customParam.value} ></XmlBuilder.CustomParams.Row>
          })}
          </tbody>
        </table>
      </div>
    );
  }

});
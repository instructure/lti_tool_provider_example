XmlBuilder.Placements = React.createClass({

  propTypes: {
    placements: React.PropTypes.array
  },

  selectAll: function() {
    $('input.placement').prop('checked', $(this.refs.cbSelectAll.getDOMNode()).prop('checked'));
  },

  render: function () {
    var placements = this.props.placements;
    return (
      <div>
        <p>{this.props.children}</p>
        <table className="table table-condensed">
          <thead>
          <tr>
            <th className="text-center checkbox-col">
              <input type="checkbox" ref="cbSelectAll" onChange={this.selectAll}/>
            </th>
            <th>Title</th>
            <th>Message Type</th>
          </tr>
          </thead>
          <tbody>
          {placements.map(function (placement) {
            return <XmlBuilder.Placements.Row key={placement.key} placementKey={placement.key} message={placement.message} >{placement.name}</XmlBuilder.Placements.Row>
          })}
          </tbody>
        </table>
      </div>
    );
  }

});

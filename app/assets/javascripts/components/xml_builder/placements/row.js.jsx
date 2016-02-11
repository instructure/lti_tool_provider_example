XmlBuilder.Placements.Row = React.createClass({

  propTypes: {
    placementKey: React.PropTypes.string
  },

  render: function () {
    var messages = this.props.message
    return (
      <tr>
        <td className="text-center checkbox-col">
          <label className="show">
            <input type="checkbox" className="placement" name={ "placements[" + this.props.placementKey + "][enabled]"}/>
          </label>
        </td>
        <td> {this.props.children} </td>
        <td className="message-type">
            <XmlBuilder.Placements.MessageChoice messages={ messages } title={ this.props.children } placementKey={ this.props.placementKey }/>
        </td>
      </tr>
    );
  }

});

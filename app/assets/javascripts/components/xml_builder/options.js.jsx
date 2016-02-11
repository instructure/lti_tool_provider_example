XmlBuilder.Options = React.createClass({

  render: function () {
    return (
      <div>
        <p>{this.props.children}</p>
        <table className="table table-condensed">
          <thead>
          <tr>
            <th className="text-center">Option</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Selection Height</td>
            <td>
              <input name="selection_height" type="number" defaultValue="500"></input>
            </td>
          </tr>
          <tr>
            <td>Selection Width</td>
            <td>
              <input name="selection_width" type="number" defaultValue="500"></input>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }

});
ContentItemBuilder.ContentItemMessage = React.createClass({

  propTypes: {
    data: React.PropTypes.string,
    returnUrl: React.PropTypes.string,
    ltiVersion: React.PropTypes.string,
    contentItems: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      ltiMsg: "",
      ltiLog: "",
      ltiErrorMsg: "",
      ltiErrorLog: ""
    };
  },

  formChangeHandler: function (e) {
    var state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  },

  formSubmitHandler: function () {
    React.findDOMNode(this.refs.contentItemForm).submit();
  },

  render: function () {
    return (
      <div>
        <ContentItemBuilder.ContentItemForm
          ref="contentItemForm"
          data={this.props.data}
          contentItems={this.props.contentItems}
          returnUrl={this.props.returnUrl}
          ltiVersion={this.props.ltiVersion}
          ltiMsg={this.state.ltiMsg}
          ltiLog={this.state.ltiLog}
          ltiErrorMsg={this.state.ltiErrorMsg}
          ltiErrorLog={this.state.ltiErrorLog}
          />
        <table>
          <tbody>
          <tr>
            <td>
              <label htmlFor="ltiLog">LTI Log</label>
            </td>
            <td>
              <input onChange={this.formChangeHandler} value={this.state.ltiLog} id="ltiLog" type="text"/>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="ltiMsg">LTI Message</label>
            </td>
            <td>
              <input onChange={this.formChangeHandler} value={this.state.ltiMsg} id="ltiMsg" type="text"/>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="ltiErrorMsg">LTI Error Message</label>
            </td>
            <td>
              <input onChange={this.formChangeHandler} value={this.state.ltiErrorMsg} id="ltiErrorMsg" type="text"/>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="ltiErrorLog">LTI Error Log</label>
            </td>
            <td>
              <input onChange={this.formChangeHandler} value={this.state.ltiErrorLog} id="ltiErrorLog" type="text"/>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button onClick={this.formSubmitHandler} type="button">Submit</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    );
  }

});
ContentItemBuilder.ContentItemForm = React.createClass({

  propTypes: {
    data: React.PropTypes.string,
    returnUrl: React.PropTypes.string,
    ltiVersion: React.PropTypes.string,
    contentItems: React.PropTypes.object,
    ltiMsg: React.PropTypes.string,
    ltiLog: React.PropTypes.string,
    ltiErrorMsg: React.PropTypes.string,
    LtiErrorLog: React.PropTypes.string
  },


  render: function () {
    if (this.props.contentItems['@graph'] && this.props.contentItems['@graph'].length === 0) {
      this.props.contentItems['@graph'].push({
        "@type": '',
        "@id": '',
        "url": '',
        "title": '',
        "text": '',
        "mediaType": '',
        "placementAdvice": {
          "displayWidth": '',
          "presentationDocumentTarget": '',
          "displayHeight": ''
        }
      });
    }

    var contentItems = this.props.contentItems.contentItems || this.props.contentItems;

    return (
      <form ref="contentItemForm" action="signed_content_item_request" method="post" id="contentItemForm">
        <input type="hidden" name="lti_message_type" value="ContentItemSelection"/>
        <input type="hidden" name="lti_version" value={this.props.ltiVersion}/>
        <input type="hidden" name="data" value={this.props.data}/>
        <input type="hidden" name="content_items" value={JSON.stringify(contentItems)}/>
        <input type="hidden" name="lti_msg" value={this.props.ltiMsg}/>
        <input type="hidden" name="lti_log" value={this.props.ltiLog}/>
        <input type="hidden" name="lti_errormsg" value={this.props.ltiErrorMsg}/>
        <input type="hidden" name="lti_errorlog" value={this.props.ltiErrorLog}/>
        <input type="hidden" name="return_url" value={this.props.returnUrl}/>
      </form>
    );
  },

  //called from parent via ref attribute
  submit: function() {
    React.findDOMNode(this.refs.contentItemForm).submit();
  }

});
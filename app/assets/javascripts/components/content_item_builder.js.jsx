var ContentItemBuilder = React.createClass({

  propTypes: {
    data: React.PropTypes.string,
    returnUrl: React.PropTypes.string,
    ltiVersion: React.PropTypes.string,
    ltiLaunchUrl: React.PropTypes.string,
    ltiUpdateUrl: React.PropTypes.string,
    textFileUrl: React.PropTypes.string,
    videoUrl: React.PropTypes.string,
    ccFileUrl: React.PropTypes.string,
    documentTargets: React.PropTypes.array,
    mediaTypes: React.PropTypes.array
  },

  getInitialState: function () {
    return {
      contentItems: {
        "@context": "http://purl.imsglobal.org/ctx/lti/v1/ContentItem",
        "@graph": []
      }
    };
  },

  updateContentItems: function () {
    this.setState({contentItems: this.refs.contentItemsElement.toJSON()});
  },

  render: function () {
    return (
      <div style={{'background': 'white'}} >
        <ContentItemBuilder.ContentItems
          ltiLaunchUrl={this.props.ltiLaunchUrl}
          ltiUpdateUrl={this.props.ltiUpdateUrl}
          textFileUrl={this.props.textFileUrl}
          videoUrl={this.props.videoUrl}
          ccFileUrl={this.props.ccFileUrl}
          documentTargets={this.props.documentTargets}
          mediaTypes={this.props.mediaTypes}
          updateContentItems={this.updateContentItems}
          ref="contentItemsElement"
          />
        <hr/>
        <ContentItemBuilder.ContentItemMessage
          data={this.props.data}
          returnUrl={this.props.returnUrl}
          ltiVersion={this.props.ltiVersion}
          contentItems={this.state.contentItems}
        />
      </div>
    );
  }
});
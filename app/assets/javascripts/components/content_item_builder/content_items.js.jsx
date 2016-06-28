ContentItemBuilder.ContentItems = React.createClass({

  propTypes: {
    initialContentItems: React.PropTypes.array,
    ltiLaunchUrl: React.PropTypes.string,
    ltiUpdateUrl: React.PropTypes.string,
    textFileUrl: React.PropTypes.string,
    videoUrl: React.PropTypes.string,
    ccFileUrl: React.PropTypes.string,
    documentTargets: React.PropTypes.array,
    mediaTypes: React.PropTypes.array,
    updateContentItems: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {contentItems: (this.props.initialContentItems || [])};
  },

  addRowHandler: function () {
    var contentItems = this.state.contentItems;
    contentItems.push({
      title: '',
      text: '',
      type: '',
      width: "300",
      height: "300",
      presentationTarget: '',
      windowTarget: '',
      confirmUrl: '',
      canvasVisibility: ''
    });
    this.setState({contentItems: contentItems});
  },

  loveHandler: function () {
    var contentItems = this.state.contentItems;
    var index = contentItems.push({
      title: 'It\'s amazing',
      text: 'Arch Linux',
      thumbnail: 'http://www.runeaudio.com/assets/img/banner-archlinux.png',
      type: 'Lti Link',
      width: "760",
      height: "500",
      presentationTarget: 'iframe',
      windowTarget: ''
    });
    this.setState({contentItems: contentItems});
    this.props.updateContentItems();
  },

  handleDelete: function (index) {
    var contentItems = this.state.contentItems;
    contentItems.splice(index, 1);
    this.setState({contentItems: contentItems, updateForm: true});
  },

  handleChange: function(index, data) {
    this.state.contentItems[index][data[0]] = data[1];
    this.props.updateContentItems();
  },

  itemTemplate: function (contentItem) {
    var retVal = this.baseContentItemJSON(contentItem);
    switch (contentItem.type) {
      case "Lti Link":
        retVal.url = this.props.ltiLaunchUrl;
        retVal.type = 'LtiLinkItem';
        retVal.mediaType = 'application/vnd.ims.lti.v1.ltilink';
        retVal.custom = {'What\'s black and white and red all over?': 'A sunburnt panda'}
        break;
      case "File Item":
        retVal.url = this.props.textFileUrl;
        retVal.type = 'FileItem';
        retVal.mediaType = 'text/plain';
        break;
      case "CC":
        retVal.url = this.props.ccFileUrl;
        retVal.type = 'FileItem';
        retVal.mediaType = 'application/zip';
        break;
      case "Video":
        retVal.url = this.props.videoUrl;
        retVal.type = 'LtiLinkItem';
        retVal.mediaType = 'application/vnd.ims.lti.v1.ltilink';
    }
    return retVal;
  },

  baseContentItemJSON: function (contentItem) {
    return {
      "title": contentItem.title,
      "text": contentItem.text,
      "updateUrl": this.props.ltiUpdateUrl,
      "placementAdvice": {
        "displayWidth": 800,
        "presentationDocumentTarget": contentItem.presentationTarget,
        "displayHeight": 600
      }
    }
  },

  render: function () {
    var contentItems = this.state.contentItems;
    var handleDelete = this.handleDelete;
    var documentTargets = this.props.documentTargets;
    var mediaTypes = this.matchTypes();
    var handleChange = this.handleChange;
    return (
      <table className="table table-condensed">
        <thead>
        <tr>
          <th>Title</th>
          <th>Text</th>
          <th>Icon</th>
          <th>Thumbnail</th>
          <th>Type</th>
          <th>Presentation Target</th>
          <th>Window Target</th>
          <th>Callback URL</th>
          <th>Canvas Visbility</th>
          <th className="add-remove-col">
            <a onClick={this.addRowHandler} href="#">
              <span className="glyphicon glyphicon-plus add-icon"> </span>
            </a>
            <a onClick={this.loveHandler} href="#">
              <span className="glyphicon glyphicon-heart love-icon" > </span>
            </a>
          </th>
        </tr>
        </thead>
        <tbody>
        {contentItems.map(function (contentItem, index) {
          return <ContentItemBuilder.ContentItems.Row
            onRowDelete={handleDelete}
            onRowChange={handleChange}
            key={index}
            index={index}
            mediaTypes={mediaTypes}
            documentTargets={documentTargets}
            title={contentItem.title}
            text={contentItem.text}
            icon={contentItem.icon}
            thumbnail={contentItem.thumbnail}
            canvasVisibility={contentItem.canvasVisibility}
            type={contentItem.itemType}
            width={contentItem.itemWidth}
            height={contentItem.itemHeight}
            presentationTarget={contentItem.itemPresentTarget}
            windowTarget={contentItem.itemWindowTarget}
            />
        })}
        </tbody>
      </table>
    );
  },

  matchTypes: function() {
    var ltiLinkMatch = /(application\/\*|application\/vnd\.ims\.lti\.v1\.ltilink|\*\/vnd\.ims\.lti\.v1\.ltilink)/;
    var fileItemMatch = /(text\/\*|text\/plain|\*\/plain)/;
    var applicationMatch = /application\/zip/;

    var allMatch = /\*\/\*/;

    var mediaTypes = this.props.mediaTypes;
    var supportedTypes = [];

    for (var type in mediaTypes) {
      var contentType = mediaTypes[type].toLowerCase();
      if (contentType.match(allMatch)) {
        supportedTypes.push('Lti Link');
        supportedTypes.push('File Item');
        supportedTypes.push('Video');
        break;
      } else if (contentType.match(fileItemMatch)) {
        supportedTypes.push('File Item');
        break;
      } else if (contentType.match(ltiLinkMatch)) {
        supportedTypes.push('Lti Link');
      } else if (contentType.match(applicationMatch)) {
        supportedTypes.push('CC');
      }
    }

    return supportedTypes;
  },

  setDefaultProp: function (contentItem, property, defaultValue) {
    if (!contentItem[property]) {
      contentItem[property] = defaultValue
    }

    return contentItem;
  },

  //called from ContentItemBuilder via ref attribute
  toJSON: function () {
    var _this = this;
    var mediaTypes = this.matchTypes();
    var items = this.state.contentItems.map(function (contentItem) {
      contentItem = _this.setDefaultProp(contentItem, 'type', mediaTypes[0]);
      contentItem = _this.setDefaultProp(contentItem, 'presentationTarget', _this.props.documentTargets[0]);
      var custom = _this.itemTemplate(contentItem).custom

      var tmpItem = {
        "@type": _this.itemTemplate(contentItem).type,
        "@id": _this.itemTemplate(contentItem).url,
        "url": _this.itemTemplate(contentItem).url,
        "title": contentItem.title,
        "text": contentItem.text,
        "confirmUrl": contentItem.confirmUrl,
        "updateUrl": _this.itemTemplate(contentItem).updateUrl,
        "mediaType": _this.itemTemplate(contentItem).mediaType,
        "windowTarget": contentItem.windowTarget,
        "placementAdvice": {
          "displayWidth": 800,
          "presentationDocumentTarget": contentItem.presentationTarget,
          "displayHeight": 600
        },
        "ext_canvas_visibility": {
          'users': [
            "86157096483e6b3a50bfedc6bac902c0b20a824f",
            "c0ddd6c90cbe1ef0f32fbce5c3bf654204be186c",
            "535fa085f22b4655f48cd5a36a9215f64c062838"
          ]
        }
      }

      if(!!contentItem.icon){
        tmpItem.icon = {
          '@id': contentItem.icon,
          height: 128,
          width: 128
        };
      }

      if(!!custom){
        tmpItem.custom = custom
      }

     // could add an if here testing on if is collaboration?


      if(!!contentItem.thumbnail){
        tmpItem.thumbnail = {
          '@id': contentItem.thumbnail,
          height: 128,
          width: 128
        };
      }
      return tmpItem;
    });
    return {
      contentItems: {
        "@context": "http://purl.imsglobal.org/ctx/lti/v1/ContentItem",
        "@graph": items || []
      }
    }
  }
});

import React, { Component } from 'react';

export default class DownloadCsv extends Component {
  _downloadTxtFile = () => {
    var element = document.createElement('a');
    //    var file = new Blob([ ***text*** ], {
    //    type: 'text/plain',
    //  });
    element.href = URL.createObjectURL(file);
    element.download = 'myFile.txt';
    element.click();
  };

  render() {
    return (
      <div>
        <button onClick={this._downloadTxtFile}>Download txt</button>
      </div>
    );
  }
}

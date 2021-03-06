import React, { Component } from 'react';

import {
  GridContainer,
  GridColumn,
  GridRow,
} from '../../../styles/layout/_grid';
import WindowExternal from '../../common/WindowExternal';
import ButtonSocialFacebook from '../../common/ButtonSocialFacebook';
import WebWorker from '../../../utils/webWorker';
import workerApp from '../../../workers/worker';
import WorkerSetup from '../../../workerSetup';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPortalWindow: false,
      textValue: '',
      count: 0,
      worker: undefined,
    };
    this.closeWindowPortal = this.closeWindowPortal.bind(this);
    this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
    this.onTextIn = this.onTextIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      this.closeWindowPortal();
    });
    this.setStateWorker();
  }

  async setStateWorker() {
    this.worker = await new WorkerSetup(workerApp);
    this.setState({
      worker: this.worker,
    });
  }

  toggleWindowPortal() {
    this.setState(state => ({
      ...state,
      showPortalWindow: !state.showPortalWindow,
    }));
  }

  closeWindowPortal() {
    this.setState({ showPortalWindow: false });
  }

  onTextIn(e) {
    this.setState({ textValue: e.target.value });
  }

  fetchWebWorker = () => {
    this.worker.postMessage('fetch User');
    this.worker.addEventListener('message', (e) => {
      this.setState({
        count: e.data.length,
      });
    });
  }

  render() {
    const { count, textValue, showPortalWindow, worker } = this.state;

    const ChildComp = ({ closeWindowPortal, onChangeTextInput }) => (
      <div>
        <p>Even though I render in a different window, I share state!</p>
        <textarea type="text" onBlur={onChangeTextInput} />
        <button type="button" onClick={() => closeWindowPortal()}>
          Close me!`
        </button>
      </div>
    );
    return (
      <GridContainer>
        <GridRow>
          <GridColumn md="12" sm="12">
            <p className="text-center">Total User Count: {count}</p>
            <button type="button" className="btn-worker" onClick={this.fetchWebWorker}>Fetch Users with Web Worker</button>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn md="12" sm="12">
            <p>Example show WindowExternal: <span>{textValue}</span></p>
            <button type="button" onClick={this.toggleWindowPortal}>
              {showPortalWindow ? 'Close the' : 'Open a'} Window Portal
            </button>
            {showPortalWindow && (
              <WindowExternal closeWindowPortal={this.closeWindowPortal}>
                <ChildComp
                  closeWindowPortal={this.closeWindowPortal}
                  onChangeTextInput={this.onTextIn}
                />
              </WindowExternal>
            )}
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn md="12" sm="12">
            {worker && (
              <WebWorker worker={worker}>
                {({ data, error, postMessage }) => {
                  if (error) return `Something went wrong: ${error.message}`;
                  if (data) {
                    return (
                      <div>
                        <strong>Received some data:</strong>
                        <pre>{data.length}</pre>
                      </div>
                    );
                  }
                  return <button type="button" onClick={() => postMessage('hello')}>Hello</button>;
                }}
              </WebWorker>
            )}
          </GridColumn>
        </GridRow>
        <div>
          <ButtonSocialFacebook language="en_US" appId={process.env.REACT_APP_FB_APP_ID}>
            <ButtonSocialFacebook.Like href="https://developers.facebook.com/docs/plugins/" />
            <ButtonSocialFacebook.Share href="https://developers.facebook.com/docs/plugins/" />
          </ButtonSocialFacebook>
        </div>
      </GridContainer>
    );
  }
}

export default Home;

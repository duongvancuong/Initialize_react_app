import React, { Component } from 'react';

import {
  GridContainer,
  GridColumn,
  GridRow,
} from '../../../styles/layout/_grid';
import WindowExternal from '../../common/WindowExternal';
import ButtonSocialFacebook from '../../common/ButtonSocialFacebook';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPortalWindow: false,
      textValue: '',
    };
    this.closeWindowPortal = this.closeWindowPortal.bind(this);
    this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
    this.onTextIn = this.onTextIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      this.closeWindowPortal();
    });
  }

  closeWindowPortal() {
    this.setState({ showPortalWindow: false });
  }

  toggleWindowPortal() {
    this.setState(state => ({
      ...state,
      showPortalWindow: !state.showPortalWindow,
    }));
  }

  onTextIn(e) {
    this.setState({ textValue: e.target.value });
  }

  render() {
    const ChildComp = ({ closeWindowPortal, onChangeTextInput }) => (
      <div>
        <p>Even though I render in a different window, I share state!</p>
        <textarea type="text" onBlur={onChangeTextInput} />
        <button onClick={() => closeWindowPortal()} >
          Close me!
        </button>
      </div>
    );
    return (
      <GridContainer>
        <GridRow>
          <GridColumn md="12" sm="12">
            <p>test</p>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn md="12" sm="12">
            <p>Example show WindowExternal: <span>{this.state.textValue}</span></p>
            <button onClick={this.toggleWindowPortal}>
              {this.state.showPortalWindow ? 'Close the' : 'Open a'} Window Portal
            </button>
            {this.state.showPortalWindow && (
              <WindowExternal closeWindowPortal={this.closeWindowPortal}>
                <ChildComp
                  closeWindowPortal={this.closeWindowPortal}
                  onChangeTextInput={this.onTextIn}
                />
              </WindowExternal>
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

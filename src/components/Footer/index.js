import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";

import { FooterStyle } from "./style";
import "./style.css";

class Footer extends React.Component {
  state = {
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <Fragment>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          className="modalWrapper"
          overlayClassName="modalOverlay"
          ariaHideApp={false}
        >
          <small>Developed by: @adenilson-santos</small>

          <section>
            <a
              title="Acessar"
              href="https://adenilson-santos.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github-square" />
            </a>
            <a
              title="Acessar"
              href="https://www.linkedin.com/in/adenilson-santos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin" />
            </a>
          </section>
        </Modal>
        <FooterStyle>
          <NavLink exact to="/" activeStyle={{ display: "none" }}>
            <i className="fas fa-arrow-left" />
          </NavLink>
          <button id="openModal" onClick={this.openModal}>
            <i className="fas fa-coffee" />
          </button>
          <NavLink exact to="/favorites" activeStyle={{ display: "none" }}>
            <i className="fas fa-arrow-right" />
          </NavLink>
        </FooterStyle>
      </Fragment>
    );
  }
}

export default Footer;

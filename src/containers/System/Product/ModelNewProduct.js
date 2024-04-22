import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import { connect } from "react-redux";
import { Button, Modal } from "reactstrap";

import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { emitter } from "../../../utils/emitter";

class ModelNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      category: "",
      cost: "",
      sale: "",
      image: "",
      quantity: "",
      description: "",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        productName: "",
        category: "",
        cost: "",
        sale: "",
        image: "",
        quantity: "",
        description: "",
      });
    });
  }
  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValideInput = () => {
    let isValid = true;
    let arrInput = [
      "productName",
      "category",
      "cost",
      "sale",
      //   "image",
      "quantity",
      "description",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewProduct = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      //call apicreat modal
      //   console.log("check data", this.state);
      this.props.createNewProduct(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"model-supplier-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a new product
        </ModalHeader>
        <ModalBody>
          <div className="modal-supplier-body">
            <div className="input-container">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "productName")
                }
                value={this.state.productName}
              ></input>
            </div>
            <div className="input-container">
              <label>Loại sản phẩm</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "category")
                }
                value={this.state.category}
              ></input>
            </div>
            <div className="input-container">
              <label>Giá mua</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "cost")}
                value={this.state.cost}
              ></input>
            </div>
            <div className="input-container">
              <label>Giá bán</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "sale")}
                value={this.state.sale}
              ></input>
            </div>
            <div className="input-container">
              <label>Số lượng</label>
              <input
                type="number"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "quantity")
                }
                value={this.state.quantity}
              ></input>
            </div>
            <div className="input-container max-width-input">
              <label>Mô tả</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "description")
                }
                value={this.state.description}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleAddNewProduct();
            }}
          >
            Add new
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelNewProduct);

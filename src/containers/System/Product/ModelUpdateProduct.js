import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import { connect } from "react-redux";
import { Button, Modal } from "reactstrap";

import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { emitter } from "../../../utils/emitter";
import _, { isEmpty } from "lodash";
import Select from 'react-select';
import { CommonUtils } from '../../../utils';
class ModelUpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      category: "",

      image: "",
      quantity: "",
      description: "",
      previewImgUrl: "",
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
        previewImgUrl: ""
      });
    });
  }
  componentDidMount() {

    let product = this.props.currentProduct;

    let imageBase64 = '';
    if (product.image) {
      imageBase64 = Buffer.from(product.image, 'base64').toString('binary');
    }

    if (product && !isEmpty(product)) {
      this.setState({
        id: product.id,
        productName: product.productName,
        quantity: product.quantity,
        description: product.description,
        previewImgUrl: imageBase64
      });
    }
  }
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      let objectUrl = URL.createObjectURL(file);

      this.setState({
        previewImgUrl: objectUrl,
        image: base64
      })

    }


  }

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
      // "category",
      // "cost",
      // "sale",
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

  handleUpdateProduct = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      //call apicreat modal
      this.props.editProduct(this.state);
    }
  };

  render() {
    return (
      <div>
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
                <label >
                  Loại sản phẩm
                  <i className="fas fa-plus" style={{ marginLeft: "10px" }}></i>
                </label>

                <Select onChange={(event) =>
                  this.handleOnChangeInput(event, "category")}
                  value={this.state.category} >

                </Select>
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
              <div className="input-container">
                <label >
                  Nhà cung cấp
                  <i className="fas fa-plus" style={{ marginLeft: "10px" }}></i>
                </label>

                <Select onChange={(event) =>
                  this.handleOnChangeInput(event, "category")}
                  value={this.state.category} >

                </Select>
              </div>
              <div className="input-container">

              </div>
              <div className="input-container">
                <label >
                  Đơn vị
                  <i className="fas fa-plus" style={{ marginLeft: "10px" }}></i>
                </label>

                <Select onChange={(event) =>
                  this.handleOnChangeInput(event, "category")}
                  value={this.state.category} >

                </Select>
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
              <div className="col-md-3">
                <label htmlFor="inputImage" className="form-label">Hình ảnh</label>
                <div className='preview-img-container'>
                  <input id='previewImg' type="file" hidden
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                  <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                  <div className='preview-image' style={{ backgroundImage: `url(${this.state.previewImgUrl} )` }}

                  >

                  </div>
                </div>


              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => {
                this.handleUpdateProduct();
              }}
            >
              Update
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

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelUpdateProduct);

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import ModelNewProduct from "./ModelNewProduct";

class ProductManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productRedux: [],
      isOpenNewProduct: false,
      //   isOpenModalEditCustomer: false,
      //   customerEdit: {},
    };
  }

  toggleProductModal = () => {
    this.setState({
      isOpenNewProduct: !this.state.isOpenNewProduct,
    });
  };

  componentDidMount() {
    this.props.fetchProductRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listproducts !== this.props.listproducts) {
      this.setState({
        productRedux: this.props.listproducts,
      });
    }
  }

  handleAddNewProduct = () => {
    this.setState({
      isOpenNewProduct: true,
    });
  };

  createNewProduct = async (data) => {
    try {
      let response = await this.props.createNewProductRedux(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        this.setState({
          isOpenNewCustomer: false,
        });
        // emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // return <div className="text-center">Manage products</div>;
    let arrProducts = this.state.productRedux;
    return (
      <div>
        <ModelNewProduct
          isOpen={this.state.isOpenNewProduct}
          toggleFromParent={this.toggleProductModal}
          createNewProduct={this.createNewProduct}
        />
        {/* {this.state.isOpenModalEditCustomer && (
          <ModelUpdateCustomer
            isOpen={this.state.isOpenModalEditCustomer}
            toggleFromParent={this.toggleCustomerEditModal}
            currentCustomer={this.state.customerEdit}
            editCustomer={this.doEditCustomer}
          />
        )} */}

        <div className="mx-1">
          <button
            className="btn btn-primary px-3 mt-5"
            onClick={() => this.handleAddNewProduct()}
          >
            <i className="fas fa-plus"></i>Thêm mới sản phẩm
          </button>
        </div>
        <div className="suppliers-table mt-4 mx-3">
          <table id="SupplierManage">
            <tbody>
              <tr>
                <th>Tên Sản phẩm</th>
                <th>Loại Sản phẩm</th>
                <th>Giá Mua</th>
                <th>Giá Bán</th>
                <th>Số Lượng</th>
                <th>Mô Tả</th>
                <th>Hình</th>
                <th></th>
              </tr>
              {arrProducts &&
                arrProducts.length > 0 &&
                arrProducts.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>{item.cost}</td>
                      <td>{item.sale}</td>
                      <td>{item.quantity}</td>
                      <td>{item.description}</td>
                      <td>{item.image}</td>

                      {/* <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleUpdateCustomer(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteCustomer(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listproducts: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductRedux: () => dispatch(actions.fetchAllProductsStart()),
    createNewProductRedux: (data) => dispatch(actions.createNewProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);

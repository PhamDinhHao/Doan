import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import ModelNewProduct from "./ModelNewProduct";
import ModelUpdateProduct from "./ModelUpdateProduct";

class ProductManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productRedux: [],
      isOpenNewProduct: false,
      isOpenModalEditProduct: false,
      productEdit: {},
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
          isOpenNewProduct: false,
        });
        // emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteProduct = (product) => {
    // e.preventDefault();
    this.props.deleteProductRedux(product.id);
  };

  handleUpdateProduct = (product) => {
    console.log("check suooo", product);
    this.setState({
      isOpenModalEditProduct: true,
      productEdit: product,
    });
  };

  toggleProductEditModal = () => {
    this.setState({
      isOpenModalEditProduct: !this.state.isOpenModalEditProduct,
    });
  };

  doEditProduct = async (product) => {
    try {
      let response = await this.props.editProductRedux(product);
      if (response && response.errCode !== 0) {
        alert(response.errCode);
      } else {
        this.setState({
          isOpenModalEditProduct: false,
        });
      }
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
        {this.state.isOpenModalEditProduct && (
          <ModelUpdateProduct
            isOpen={this.state.isOpenModalEditProduct}
            toggleFromParent={this.toggleProductEditModal}
            currentProduct={this.state.productEdit}
            editProduct={this.doEditProduct}
          />
        )}

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


                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleUpdateProduct(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteProduct(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
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
    deleteProductRedux: (id) => dispatch(actions.deleteProduct(id)),
    editProductRedux: (data) => dispatch(actions.editProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);

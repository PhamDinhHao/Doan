import React, { Component, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import ModelNewProduct from "./ModelNewProduct";
import ModelUpdateProduct from "./ModelUpdateProduct";
import './ProductManage.scss'
import Select from 'react-select';
import { Divider, Radio, Table } from "antd";
import { getAllProducts } from '../../../services/productService'
import { reduce, template } from "lodash";






class ProductManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productRedux: [],
      isOpenNewProduct: false,
      isOpenModalEditProduct: false,
      productEdit: {},

      listProduct: [],
      selectedProduct: [],

      tempProduct: [],

      selectionType: 'checkbox',
      loading: false,
      selectedRowKeys: [],
      columns: [
        {
          title: 'Tên sản phẩm',
          dataIndex: 'productName',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Hình ảnh',
          dataIndex: 'image',
          render: (imageBase64) => {
            const imageBinary = Buffer.from(imageBase64, 'base64').toString('binary');

            return <img src={imageBinary} alt="Product" style={{ width: 36, height: 38 }} />;
          },
        },
        {
          title: 'Số lượng',
          dataIndex: 'quantity',
        },
        {
          title: 'Actions',
          dataIndex: '',
          render: (text, record) => (
            <button onClick={() => this.handleUpdateProduct(record)}>
              {"Button Text"}
            </button>
          ),
        },
      ]

    };


  }

  handleDetail = (record) => {
    console.log("chceck id", record)
  }
  handleDelete = (record) => {

  }
  handleSelectionTypeChange = (e) => {
    this.setState({
      selectionType: e.target.value,
    });
  };
  toggleProductModal = () => {
    this.setState({
      isOpenNewProduct: !this.state.isOpenNewProduct,
    });
  };

  componentDidMount() {
    this.props.fetchProductRedux();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listproducts !== this.props.listproducts) {
      let dataSelect = this.buildDataInputSelect(this.props.listproducts)
      this.setState({
        productRedux: this.props.listproducts,
        listProduct: dataSelect
      });
    }
    // if (prevState.selectedProduct !== this.state.selectedProduct) {
    //   console.log("check state", this.state.selectedProduct[0].value)
    //   if (this.state.selectedProduct) {
    //     let res = await getAllProducts(this.state.selectedProduct[0].value)
    //     this.setState({
    //       tempProduct: res.products
    //     })
    //     console.log("check all", this.state.tempProduct)
    //     // this.setState({
    //     //   productRedux: res.products,

    //     // });
    //   }

    //   // this.props.fetchProductRedux(this.state.listProduct.value)
    // }

  }
  handleChangeSelect = async (selectedProduct) => {
    this.setState({ selectedProduct: selectedProduct });
  };
  filterProducts = (products, selectedOption) => {
    console.log("check oop", selectedOption)
    if (selectedOption === null) return products;
    if (selectedOption.length === 0) return products; // If no option selected, return all products
    return products.filter(product => product.id === selectedOption.value);
  };
  buildDataInputSelect = (inputData) => {
    let result = [];

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.productName;
        object.value = item.id;
        result.push(object);
      })

    }
    return result
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
    const filteredProducts = this.filterProducts(this.state.productRedux, this.state.selectedProduct);





    return (
      <div className="product">
        <div className="product-content">
          <div className="main-left">
            <div className="heading-page">
              <span className="ng-binding">Hàng hóa</span>
            </div>
          </div>
          <div className="main-right">
            <div className="mainWrap">
              <div className="header-filter">
                <div className="header-filter-search">
                  <Select

                    classNamePrefix="select"
                    placeholder={"Search"}
                    isClearable
                    value={this.state.selectedProduct}
                    onChange={this.handleChangeSelect}
                    options={this.state.listProduct}

                  />
                </div>
                <div className="header-filter-buttons">

                  <button className="btn btn-success" onClick={() => this.handleAddNewProduct()}>
                    <i className="fas fa-plus"></i>
                    <span>Them moi</span>
                  </button>

                </div>
              </div>
              <div className="product-list">
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

                {/* <div className="mx-1">
                  <button
                    className="btn btn-primary px-3 mt-5"
                    onClick={() => this.handleAddNewProduct()}
                  >
                    <i className="fas fa-plus"></i>Thêm mới sản phẩm
                  </button>
                </div> */}

                <div className="suppliers-table mt-4">
                  {/* <table id="SupplierManage">

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

                  </table> */}
                  <div>
                    {/* <Radio.Group
                      onChange={this.handleSelectionTypeChange}
                      value={selectionType}
                    >
                      <Radio value="checkbox">Checkbox</Radio>
                      <Radio value="radio">Radio</Radio>
                    </Radio.Group> */}




                    <Table
                      pagination={{ pageSize: 4 }} scroll={{ y: 240 }} columns={this.state.columns} dataSource={filteredProducts} onRow={(record, rowIndex) => {
                        // return {
                        //   onClick: event => {
                        //     this.handleDetail(record)

                        //   },
                        // };

                      }} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      // <div>
      //   <ModelNewProduct
      //     isOpen={this.state.isOpenNewProduct}
      //     toggleFromParent={this.toggleProductModal}
      //     createNewProduct={this.createNewProduct}
      //   />
      //   {this.state.isOpenModalEditProduct && (
      //     <ModelUpdateProduct
      //       isOpen={this.state.isOpenModalEditProduct}
      //       toggleFromParent={this.toggleProductEditModal}
      //       currentProduct={this.state.productEdit}
      //       editProduct={this.doEditProduct}
      //     />
      //   )}

      //   <div className="mx-1">
      //     <button
      //       className="btn btn-primary px-3 mt-5"
      //       onClick={() => this.handleAddNewProduct()}
      //     >
      //       <i className="fas fa-plus"></i>Thêm mới sản phẩm
      //     </button>
      //   </div>
      //   <div className="suppliers-table mt-4 mx-3">
      //     <table id="SupplierManage">
      //       <tbody>
      //         <tr>
      //           <th>Tên Sản phẩm</th>
      //           <th>Loại Sản phẩm</th>
      //           <th>Giá Mua</th>
      //           <th>Giá Bán</th>
      //           <th>Số Lượng</th>
      //           <th>Mô Tả</th>
      //           <th>Hình</th>
      //           <th></th>
      //         </tr>
      //         {arrProducts &&
      //           arrProducts.length > 0 &&
      //           arrProducts.map((item, index) => {
      //             return (
      //               <tr key={index}>
      //                 <td>{item.productName}</td>
      //                 <td>{item.category}</td>
      //                 <td>{item.cost}</td>
      //                 <td>{item.sale}</td>
      //                 <td>{item.quantity}</td>
      //                 <td>{item.description}</td>


      //                 <td>
      //                   <button
      //                     className="btn-edit"
      //                     onClick={() => this.handleUpdateProduct(item)}
      //                   >
      //                     <i className="fas fa-pencil-alt"></i>
      //                   </button>
      //                   <button
      //                     className="btn-delete"
      //                     onClick={() => this.handleDeleteProduct(item)}
      //                   >
      //                     <i className="fas fa-trash"></i>
      //                   </button>
      //                 </td>
      //               </tr>
      //             );
      //           })}
      //       </tbody>
      //     </table>
      //   </div>
      // </div>
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
    fetchProductRedux: (inputId) => dispatch(actions.fetchAllProductsStart(inputId)),
    createNewProductRedux: (data) => dispatch(actions.createNewProduct(data)),
    deleteProductRedux: (id) => dispatch(actions.deleteProduct(id)),
    editProductRedux: (data) => dispatch(actions.editProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./PurchaseNew.scss";
import Autosuggest from "react-autosuggest";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
// import InputSuggest from "../../../components/Input/InputSuggest";

class PurchaseNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierValue: "",
      supplierSuggestions: [],
      productValue: "",
      productSuggestions: [],
      tableData: [],
      updatedTableData: [],
      selectedDate: new Date(),
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.supplierSuggestions !== this.props.supplierSuggestions) {
      // console.log(
      //   "Supplier suggestions received:",
      //   this.props.supplierSuggestions
      // );
      this.setState({ supplierSuggestions: this.props.supplierSuggestions });
    }
    if (prevProps.productSuggestions !== this.props.productSuggestions) {
      this.setState({ productSuggestions: this.props.productSuggestions });
    }
  }

  getSupplierSuggestions = async (value) => {
    try {
      // const response = await fetch(`/api/get-supplier-suggestion?q=${value}`);
      // const data = await response.json();

      // if (data && data.length > 0) {
      //   this.setState({ supplierSuggestions: data });
      // } else {
      //   this.setState({ supplierSuggestions: [] });
      // }
      this.props.fetchSupplierSuggestionsRedux(value);
    } catch (error) {
      console.error("error fetching supplier suggestions", error);
    }
  };

  getProductSuggestions = async (value) => {
    try {
      this.props.fetchProductSuggestionsRedux(value);
    } catch (error) {
      console.error("error fetching product suggestions", error);
    }
  };

  renderSupplierSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  renderProductSuggestion = (suggestion) => <div>{suggestion.productName}</div>;

  onSupplierChange = (event, { newValue }) => {
    this.setState({
      supplierValue: newValue,
    });
    this.getSupplierSuggestions(newValue);
  };

  onProductChange = (event, { newValue }) => {
    this.setState({
      productValue: newValue,
    });
    this.getProductSuggestions(newValue);
  };

  onSupplierSuggestionsFetchRequested = ({ value }) => {
    this.getSupplierSuggestions(value);
  };

  onProductSuggestionsFetchRequested = ({ value }) => {
    this.getProductSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({ supplierSuggestions: [] });
  };

  onProductTableSuggestionSelected = (event, { suggestion }) => {
    // const { tableData } = this.state;
    // const newProduct = {
    //   id: suggestion.id,
    //   name: suggestion.productName,
    //   quantity: 1,
    //   price: 0,
    // };
    // const newTableData = [...tableData, newProduct];
    // this.setState({ tableData: newTableData });
    // this.setState({ productValue: "" });
    const { tableData } = this.state;
    const existingProductIndex = tableData.findIndex(
      (product) => product.id === suggestion.id
    );

    if (existingProductIndex !== -1) {
      // Sản phẩm đã tồn tại trong bảng
      const updatedTableData = [...tableData];
      updatedTableData[existingProductIndex].quantity++; // Tăng số lượng sản phẩm
      this.setState({ tableData: updatedTableData });
    } else {
      // Sản phẩm chưa tồn tại trong bảng
      const newProduct = {
        id: suggestion.id,
        name: suggestion.productName,
        quantity: 1,
        price: 0,
      };
      const newTableData = [...tableData, newProduct];
      this.setState({ tableData: newTableData });
    }
  };

  onQuantityIncrease = (index) => {
    const { tableData } = this.state;
    const updatedTableData = [...tableData];
    updatedTableData[index].quantity++;
    this.setState({ tableData: updatedTableData });
  };

  onQuantityDecrease = (index) => {
    const { tableData } = this.state;
    const updatedTableData = [...tableData];
    updatedTableData[index].quantity--;
    this.setState({ tableData: updatedTableData });
  };

  onPriceChange = (index, newPrice) => {
    const { tableData } = this.state;
    const updatedTableData = [...tableData];
    updatedTableData[index].price = newPrice;
    this.setState({ tableData: updatedTableData });
  };

  onDeleteProduct = (index) => {
    const { tableData } = this.state;
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    this.setState({ tableData: updatedTableData });
  };

  getTotalQuantity = () => {
    const { tableData } = this.state;
    let totalQuantity = 0;
    tableData.forEach((product) => {
      totalQuantity += product.quantity;
    });
    return totalQuantity;
  };

  getTotalMoney = () => {
    const { tableData } = this.state;
    let totalMoney = 0;
    tableData.forEach((product) => {
      totalMoney += product.quantity * product.price;
    });
    return totalMoney;
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  render() {
    const {
      supplierValue,
      supplierSuggestions,
      productValue,
      productSuggestions,
      tableData,
      updatedTableData,
      selectedDate,
    } = this.state;
    // console.log("productSuggestions:", productSuggestions);

    const supplierInputProps = {
      placeholder: "Search supplier",
      value: supplierValue,
      onChange: this.onSupplierChange,
    };

    const productInputProps = {
      placeholder: "Search product",
      value: productValue,
      onChange: this.onProductChange,
    };
    // console.log("Autosuggest props:", {
    //   suggestions: supplierSuggestions,
    //   onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
    //   onSuggestionsClearRequested: this.onSuggestionsClearRequested,
    //   getSuggestionValue: this.getSuggestionValue,
    //   renderSuggestion: this.renderSuggestion,
    //   inputProps: supplierInputProps,
    // });
    return (
      <div class="cover-div">
        <div class="item-left">
          <div class="search-box">
            <div class="back-arrow">
              <button>
                <i class="fas fa-arrow-left"></i>
              </button>
            </div>
            <div class="search-bar">
              <button>
                <i class="fas fa-search icon"></i>
              </button>
              {/* <input type="text" placeholder="Search product"></input> */}
              <div class="suggestion-container">
                <Autosuggest
                  suggestions={productSuggestions}
                  onSuggestionsFetchRequested={
                    this.onProductSuggestionsFetchRequested
                  }
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={(suggestion) => suggestion.productName}
                  renderSuggestion={this.renderProductSuggestion}
                  inputProps={productInputProps}
                  onSuggestionSelected={this.onProductTableSuggestionSelected}
                />
              </div>
              <button>
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="item-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>STT</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => this.onDeleteProduct(index)}
                      >
                        <i
                          className="fas fa-trash"
                          style={{ color: "#B22222" }}
                        ></i>
                      </button>
                    </td>
                    <td>{index + 1}</td>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                      <button
                        className="quantity-btn"
                        onClick={() => this.onQuantityDecrease(index)}
                        disabled={product.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity">{product.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => this.onQuantityIncrease(index)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                          this.onPriceChange(index, e.target.value)
                        }
                      />
                    </td>
                    <td>{product.quantity * product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div class="item-right">
          <div class="purchare-order">
            <div class="user-box">
              <div class="user-name">
                <span>user</span>
              </div>
              <div class="datetime-picker">
                <DatePicker
                  value={selectedDate}
                  onChange={this.handleDateChange}
                />
              </div>
            </div>
            <div class="search-bar">
              <button>
                <i class="fas fa-search icon"></i>
              </button>
              {/* <input type="text" placeholder="Search supplier"></input> */}
              <div class="suggestion-container">
                <Autosuggest
                  suggestions={supplierSuggestions}
                  onSuggestionsFetchRequested={
                    this.onSupplierSuggestionsFetchRequested
                  }
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={(suggestion) => suggestion.name}
                  renderSuggestion={this.renderSupplierSuggestion}
                  inputProps={supplierInputProps}
                />
              </div>
              <button>
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div class="quantity-box">
              <span>quantity:</span>
              <span class="total-quantity">{this.getTotalQuantity()}</span>
            </div>
            <div class="money-box">
              <span>total:</span>
              <span class="total-money">{this.getTotalMoney()}</span>
            </div>
          </div>
          <div class="wrap-button">
            <a class="btn btn-success btn-font--medium ng-binding ng-isolate-scope">
              <i class="fas fa-check"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    supplierSuggestions: state.supplier.supplierSuggestions,
    productSuggestions: state.product.productSuggestions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSupplierSuggestionsRedux: (value) =>
      dispatch(actions.fetchSupplierSuggestions(value)),
    fetchProductSuggestionsRedux: (value) =>
      dispatch(actions.fetchProductSuggestions(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseNew);

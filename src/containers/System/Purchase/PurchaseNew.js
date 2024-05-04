import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./PurchaseNew.scss";
import Autosuggest from "react-autosuggest";
import * as actions from "../../../store/actions";

class PurchaseNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierValue: "",
      supplierSuggestions: [],
      productValue: "",
      productSuggestions: [],
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.supplierSuggestions !== this.props.supplierSuggestions) {
      console.log(
        "Supplier suggestions received:",
        this.props.supplierSuggestions
      );
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

  render() {
    const {
      supplierValue,
      supplierSuggestions,
      productValue,
      productSuggestions,
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
                  <th>STT</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody></tbody>
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
                <span>time</span>
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
              <span class="total-quantity">0</span>
            </div>
            <div class="money-box">
              <span>total:</span>
              <span class="total-money">0</span>
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

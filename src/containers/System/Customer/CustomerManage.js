import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import ModelNewCustomer from "./ModelNewCustomer";
import ModelUpdateCustomer from "./ModelUpdateCustomer";

class CustomerManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerRedux: [],
      isOpenNewCustomer: false,
      isOpenModalEditCustomer: false,
      customerEdit: {},
    };
  }

  toggleCustomerModal = () => {
    this.setState({
      isOpenNewCustomer: !this.state.isOpenNewCustomer,
    });
  };

  componentDidMount() {
    this.props.fetchCustomerRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listcustomers !== this.props.listcustomers) {
      this.setState({
        customerRedux: this.props.listcustomers,
      });
    }
  }

  createNewCustomer = async (data) => {
    try {
      let response = await this.props.createNewCustomerRedux(data);
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

  handleAddNewCustomer = () => {
    this.setState({
      isOpenNewCustomer: true,
    });
  };

  handleDeleteCustomer = (customer) => {
    // e.preventDefault();
    this.props.deleteCustomerRedux(customer.id);
  };

  handleUpdateCustomer = (customer) => {
    console.log("check suooo", customer);
    this.setState({
      isOpenModalEditCustomer: true,
      customerEdit: customer,
    });
  };

  toggleCustomerEditModal = () => {
    this.setState({
      isOpenModalEditCustomer: !this.state.isOpenModalEditCustomer,
    });
  };

  doEditCustomer = async (customer) => {
    try {
      let response = await this.props.editCustomerRedux(customer);
      if (response && response.errCode !== 0) {
        alert(response.errCode);
      } else {
        this.setState({
          isOpenModalEditCustomer: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrCustomers = this.state.customerRedux;
    return (
      <div>
        <ModelNewCustomer
          isOpen={this.state.isOpenNewCustomer}
          toggleFromParent={this.toggleCustomerModal}
          createNewCustomer={this.createNewCustomer}
        />
        {this.state.isOpenModalEditCustomer && (
          <ModelUpdateCustomer
            isOpen={this.state.isOpenModalEditCustomer}
            toggleFromParent={this.toggleCustomerEditModal}
            currentCustomer={this.state.customerEdit}
            editCustomer={this.doEditCustomer}
          />
        )}

        <div className="mx-1">
          <button
            className="btn btn-primary px-3 mt-5"
            onClick={() => this.handleAddNewCustomer()}
          >
            <i className="fas fa-plus"></i>Thêm mới khách
          </button>
        </div>
        <div className="suppliers-table mt-4 mx-3">
          <table id="SupplierManage">
            <tbody>
              <tr>
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>gioi tinh</th>
                <th>ngay sinh</th>
                <th>Số nợ</th>
                <th></th>
              </tr>
              {arrCustomers &&
                arrCustomers.length > 0 &&
                arrCustomers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.address}</td>
                      <td>{item.gender}</td>
                      <td>{item.birthday}</td>
                      <td>{item.debtCustomer}</td>

                      <td>
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
    listcustomers: state.customer.customers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCustomerRedux: () => dispatch(actions.fetchAllCustomersStart()),
    createNewCustomerRedux: (data) => dispatch(actions.createNewCustomer(data)),
    deleteCustomerRedux: (id) => dispatch(actions.deleteCustomer(id)),
    editCustomerRedux: (data) => dispatch(actions.editCustomer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManage);

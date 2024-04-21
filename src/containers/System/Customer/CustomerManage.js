import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class CustomerManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerRedux: [],
      // isOpenNewSupplier: false,
      // isOpenModalEditSupplier: false,
      // supplierEdit: {}
    };
  }

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

  render() {
    let arrCustomers = this.state.customerRedux;
    return (
      <div>
        {/* <ModelNewSupplier
          isOpen={this.state.isOpenNewSupplier}
          toggleFromParent={this.toggleSupplierModal}
          createNewSupplier={this.createNewSupplier}
        />
        {this.state.isOpenModalEditSupplier && (
          <ModelUpdateSupplier
            isOpen={this.state.isOpenModalEditSupplier}
            toggleFromParent={this.toggleSupplierEditModal}
            currentSupplier={this.state.supplierEdit}
            editSupplier={this.doEditSupplier}
          />
        )} */}

        <div className="mx-1">
          <button
            className="btn btn-primary px-3 mt-5"
            onClick={() => this.handleAddNewSupplier()}
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

                      {/* <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleUpdateSupplier(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteSupplier(item)}
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
    listcustomers: state.customer.customers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCustomerRedux: () => dispatch(actions.fetchAllCustomersStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManage);

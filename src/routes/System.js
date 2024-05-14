import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import ProductManage from "../containers/System/Product/ProductManage";
import CustomerManage from "../containers/System/Customer/CustomerManage";
import SupplierManage from "../containers/System/Supplier/SupplierManage";
import PurchaseManage from "../containers/System/Purchase/PurchaseManage";
import PurchaseNew from "../containers/System/Purchase/PurchaseNew";
import PurchaseUpdate from "../containers/System/Purchase/PurchaseUpdate";
import SaleNew from "../containers/System/Sale/SaleNew";
import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";

class System extends Component {
  render() {
    const { systemMenuPath } = this.props;
    return (
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/system/user-manage" component={UserManage} />
            <Route path="/system/product" component={ProductManage} />
            <Route path="/system/customer" component={CustomerManage} />
            <Route path="/system/supplier" component={SupplierManage} />
            <Route path="/system/purchase" component={PurchaseManage} />
            <Route path="/system/purchase-new" component={PurchaseNew} />
            <Route path="/system/purchase-update" component={PurchaseUpdate} />
            <Route path="/system/sale" component={SaleNew} />

            <Route
              path="/system/register-package-group-or-account"
              component={RegisterPackageGroupOrAcc}
            />

            <Route
              component={() => {
                return <Redirect to={systemMenuPath} />;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);

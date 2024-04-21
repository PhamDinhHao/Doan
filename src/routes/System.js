import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import ProductManage from "../containers/System/ProductManage";
import CustomerManage from "../containers/System/Customer/CustomerManage";
import SupplierManage from "../containers/System/Supplier/SupplierManage";
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
            <Route path="/system/product-manage" component={ProductManage} />
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

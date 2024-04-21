import React, { Component } from 'react';

import { connect } from 'react-redux';
import './SupplierManage.scss';
import * as actions from "../../../store/actions";
import ModelNewSupplier from './ModelNewSupplier';
import ModelUpdateSupplier from './ModelUpdateSupplier';
import { emitter } from "../../../utils/emitter";



class SupplierManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            supplierRedux: [],
            isOpenNewSupplier: false,
            isOpenModalEditSupplier: false,
            supplierEdit: {}
        }
    }
    componentDidMount() {
        this.props.fetchSupplierRedux();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSuppliers !== this.props.listSuppliers) {
            this.setState({
                supplierRedux: this.props.listSuppliers
            })
        }
    }
    toggleSupplierModal = () => {
        this.setState({
            isOpenNewSupplier: !this.state.isOpenNewSupplier,
        })
    }
    toggleSupplierEditModal = () => {
        this.setState({
            isOpenModalEditSupplier: !this.state.isOpenModalEditSupplier,
        })
    }
    handleDeleteSupplier = (supplier) => {
        // e.preventDefault();
        this.props.deleteSupplierRedux(supplier.id)
    }
    handleAddNewSupplier = () => {
        this.setState({
            isOpenNewSupplier: true
        })

    }
    createNewSupplier = async (data) => {
        try {
            let response = await this.props.createNewSupplierRedux(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            }
            else {
                this.setState({
                    isOpenNewSupplier: false

                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })

            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }
    handleUpdateSupplier = (supplier) => {
        console.log("check suooo", supplier)
        this.setState({
            isOpenModalEditSupplier: true,
            supplierEdit: supplier,

        })
    }
    doEditSupplier = async (supplier) => {
        try {

            let response = await this.props.editSupplierRedux(supplier);
            if (response && response.errCode !== 0) {
                alert(response.errCode)


            }
            else {
                this.setState({
                    isOpenModalEditSupplier: false
                })

            }

        } catch (error) {
            console.log(error)
        }



    }

    render() {


        let arrSuppliers = this.state.supplierRedux;
        return (
            <div>
                <ModelNewSupplier
                    isOpen={this.state.isOpenNewSupplier}
                    toggleFromParent={this.toggleSupplierModal}
                    createNewSupplier={this.createNewSupplier}
                />
                {this.state.isOpenModalEditSupplier &&
                    <ModelUpdateSupplier
                        isOpen={this.state.isOpenModalEditSupplier}
                        toggleFromParent={this.toggleSupplierEditModal}
                        currentSupplier={this.state.supplierEdit}
                        editSupplier={this.doEditSupplier}
                    />}

                <div className='mx-1'>
                    <button className='btn btn-primary px-3 mt-5' onClick={() => this.handleAddNewSupplier()}><i className='fas fa-plus'></i>Thêm mới người dùng</button>
                </div>
                <div className='suppliers-table mt-4 mx-3'>
                    <table id='SupplierManage'  >
                        <tbody>
                            <tr>
                                <th>Tên</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Số nợ</th>
                                <th></th>
                            </tr>
                            {arrSuppliers && arrSuppliers.length > 0 && arrSuppliers.map((item, index) => {

                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td>{item.debtSupplier}</td>

                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleUpdateSupplier(item)}><i className='fas fa-pencil-alt' ></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteSupplier(item)}><i className='fas fa-trash' ></i></button>
                                        </td>

                                    </tr>
                                )
                            })}





                        </tbody>
                    </table>
                </div>
            </div>




        );
    }

}

const mapStateToProps = state => {
    return {
        listSuppliers: state.supplier.suppliers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSupplierRedux: () => dispatch(actions.fetchAllSuppliersStart()),
        deleteSupplierRedux: (id) => dispatch(actions.deleteSupplier(id)),
        createNewSupplierRedux: (data) => dispatch(actions.createNewSupplier(data)),
        editSupplierRedux: (data) => dispatch(actions.editSupplier(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierManage);

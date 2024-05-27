import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Colum.scss';
import { getAllHistorySale, getAllHistoryPurchase, getAllHistorySaleMonth, getAllHistoryPurchaseMonth } from '../../../services/columService';
import { Radio } from 'antd';

class Colum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSale: [],
            dataSaleMonth: [],
            dataPurchase: [],
            dataPurchaseMonth: [],
            value: 1
        };
    }

    async componentDidMount() {
        try {
            const [res1, res2, res3, res4] = await Promise.all([
                getAllHistorySale(),
                getAllHistoryPurchase(),
                getAllHistorySaleMonth(),
                getAllHistoryPurchaseMonth()
            ]);
            this.setState({ dataSale: res1.data, dataPurchase: res2.data, dataSaleMonth: res3.data, dataPurchaseMonth: res4.data });
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render() {
        const { dataSale, dataSaleMonth, dataPurchase, dataPurchaseMonth, value } = this.state;
        const totalSale = value === 2 ? dataSaleMonth : dataSale;
        const totalPurchse = value === 2 ? dataPurchaseMonth : dataPurchase;

        return (
            <div>
                <h3>Tổng thu chi</h3>
                <div className='main-colum'>
                    <div className='main-radio-colum'>
                        <div className='radio-colum'>
                            <Radio.Group onChange={this.onChange} value={value}>
                                <Radio value={1}>Theo ngày</Radio>
                                <Radio value={2}>Theo tháng</Radio>
                            </Radio.Group>
                        </div>
                    </div>

                    <div className='content-colum'>
                        <div className='top-content'>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={totalSale}>
                                    <CartesianGrid strokeDasharray="1 1" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="totalSales" fill="#8884d8" name="Tổng thu" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='bot-content'>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={totalPurchse}>
                                    <CartesianGrid strokeDasharray="1 1" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="totalPurchases" fill="#8884d8" name="Tổng chi" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Colum);

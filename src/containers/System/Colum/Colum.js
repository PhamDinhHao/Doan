
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal } from 'reactstrap';

import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { emitter } from "../../../utils/emitter";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart } from 'recharts';
import './Colum.scss';
import { getAllHistorySale, getAllHistoryPurchase } from '../../../services/columService';



class Colum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSale: [],
            dataPurchase: []

        }


    }

    async componentDidMount() {
        const res = await getAllHistorySale();
        const re = await getAllHistoryPurchase();
        this.setState({ dataSale: res.data, dataPurchase: re.data });
    }




    render() {
        const { dataSale, dataPurchase } = this.state;
        console.log("checkaaa", this.state.dataPurchase)
        return (
            <div>
                <div className='top-content'>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dataSale}>
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
                        <BarChart data={dataPurchase}>
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





        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Colum);

import React, { Component } from 'react';
import {baseURL} from '../../api';
import axios from "axios";
import dateyear from '../../routes/dateyear';
import Moment from 'moment';

class RecentOrders extends Component {

	state = {
		recentOrders: null
	}

	componentDidMount() {
		this.getRecentOrders();
	}
	getRecentOrders() {

		axios({
			url: baseURL+"/panel-fetch-dashboard-data/"+dateyear,
			method: "GET",
			headers: {
			  Authorization: `Bearer ${localStorage.getItem("login")}`,
			},
		  })
			.then((res) => {
			  this.setState({ recentOrders: res.data.enquiry_latest });
			})
			.catch((res) => {
			  alert("Something Went Wrong!");
			  
			});
	}

	render() {
		const { recentOrders } = this.state;
		return (
			<div className="table-responsive">
				<table className="table table-hover mb-0">
					<thead>
						<tr>
							<th>Enquiry No</th>
							<th>Date</th>
							<th>Full Name</th>
							<th>Mobile</th>
							<th>City</th>
							<th>Course</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{recentOrders && recentOrders.map((order, key) => (
							<tr key={key}>
								<td>{order.enquiry_no}</td>
								<td>{ Moment(order.enquiry_date).format('DD-MM-YYYY')}</td>
								<td>{order.enquiry_title}{" "}{order.enquiry_full_name}</td>
								<td>{order.enquiry_mobile}</td>
								<td>{order.enquiry_city}</td>
								<td>{order.enquiry_course}</td>
								<td>{order.enquiry_status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default RecentOrders;

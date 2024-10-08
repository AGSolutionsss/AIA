import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';

// redux actions
import { onToggleMenu } from 'Actions';

class SidebarContent extends Component {



	toggleMenu(menu, stateCategory) {
		let data = {
			menu,
			stateCategory
		}
		this.props.onToggleMenu(data);
	}

	render() {
		
		const { sidebarMenus } = this.props.sidebar;
		return (
			<div className="rct-sidebar-nav">
				<nav className="navigation">
					<List
						className="rct-mainMenu p-0 m-0 list-unstyled"
						subheader={
							<ListSubheader className="side-title" component="li" >
								<IntlMessages id="sidebar.general" />
							</ListSubheader>}
					>

						{localStorage.getItem("user_type_id") == 1 ? sidebarMenus.category1.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category1')}
							/>
						)) :
						 " "
						}

						{localStorage.getItem("user_type_id") == 2 ? sidebarMenus.category2.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category2')}
							/>
						)) :
						 " "
						}
						
						{localStorage.getItem("user_type_id") == 3 ? sidebarMenus.category3.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category3')}
							/>
						)) : " "
						 
						}
						{localStorage.getItem("user_type_id") == 4 ? sidebarMenus.category4.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category4')}
							/>
						)) : " "
						 
						}
						
						{localStorage.getItem("user_type_id") == 5 ? sidebarMenus.category5.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category5')}
							/>
						)) : " "
						 
						}

						{localStorage.getItem("user_type_id") == 6 ? sidebarMenus.category6.map((menu, key) => (
							<NavMenuItem
								style={{ color: "gray!important" }}
								menu={menu}
								key={key}
								onToggleMenu={() => this.toggleMenu(menu, 'category6')}
							/>
						)) : " "
						 
						}
					</List>
					
					
					
				</nav>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ sidebar, settings }) => {
	return { sidebar, settings };
};

export default withRouter(connect(mapStateToProps, {
	onToggleMenu
})(SidebarContent));

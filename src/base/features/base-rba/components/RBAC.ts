import React, { Children } from 'react';
import { connect } from 'react-redux';
import { RBAStatus } from '../consts';
import { getPermissions } from '..';

interface Props {
	children?: any;
	authenticated?: boolean;
	id: string;
	permissions?: any[];
}

class RBAC extends React.Component<Props> {
	applyAuth(child: any) {
		let result = child;
		const { authenticated } = this.props;
		if (typeof authenticated !== 'undefined' && !authenticated) {
			result = null;
		}

		return result;
	}

	applyRules(child: any, permissions: any) {
		let result = child;

		if (child !== null && permissions.length !== 0) {
			if (permissions.indexOf(RBAStatus.HIDDEN) >= 0) {
				result = null;
			} else if (permissions.indexOf(RBAStatus.DISABLED) >= 0) {
				result = React.cloneElement(child, {
					disabled: true
				});
			}
		}

		return result;
	}

	wrap(child: any) {
		let result = child;
		const { id } = this.props;
		if (child !== null) {
			result = React.cloneElement(child, {
				[RBAStatus.DOM_ID]: id
			});
		}

		return result;
	}

	render() {
		const {
			permissions,
			children,
			id
		} = this.props;
		const permissionsContext = permissions ? permissions[id] : [];
		const child = children ? Children.only(children) : null;
		// eslint-disable-next-line max-len
		// ENABLE THE FOLLOWING LINE IF YOU WANT TO HAVE THE ABILITY TO SHOW OR HIDE COMPONENTS BASED ON USER THAT AUTHENTICATED OR NOT
		// let result = this.applyAuth(child);
		let result = this.applyRules(child, permissionsContext);
		result = this.wrap(result);
		return result;
	}
}

export const mapStateToProps = () => {
	return {
		permissions: getPermissions()
	};
};
export const mapDispatchToProps = () => {
	return {
        
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(RBAC);

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import PropTypes from 'prop-types';

export default class RadioButon extends Component {
	state = {
		value: null,
	};

	static propTypes = {
		onClick: PropTypes.func.isRequired
	  };z


	render() {
		const { PROP } = this.props;
		const { value } = this.state;
		const teste = ()=>this.props.values;

		return (

			<View style={styles.checkboxlabel}>
				{PROP.map(res => {
					return (
			<View key={res.key} style={styles.container}>
                <RadioButton

						value={res.key}
						status={this.state.value === res.key ? 'checked' : 'unchecked' }
						onPress={() => {
							this.setState({
								value: res.key,
							});
						}}>

                    </RadioButton>
							<Text style={styles.radioText}>{res.text}</Text>
						</View>
					);
				})}
                <Text> Selected: {this.state.value} </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},

	checkboxlabel: {
		marginTop: 5,
		right: 95,
	  },

});
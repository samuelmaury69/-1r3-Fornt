import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';

/**
 * 
 * Custom Component for display a single item of a contact phone numbers list
 * 
 */
class ContactListItem extends Component {
    shouldComponentUpdate = (nextProps, nextState) => {
        return nextProps.checked !== this.props.checked;
    }
    render () {
        return (
            <TouchableOpacity style={[this.props.styles, styles.mainContainer]} onPress={() => this.props.onToggle({ name: this.props.name, cell: this.props.phone })}>
                <CheckBox style={styles.checkbox} onClick={() => {}} isChecked={this.props.checked} />
                <View style={styles.dataContainer}>
                    <Text style={styles.textBold}>{this.props.name}</Text>
                    <Text style={styles.textLight}>{this.props.phone}</Text>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dataContainer: {
        flexDirection: 'column'
    },
    checkbox: {
        marginRight: 10
    },
    textBold: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#002A3D'
    },
    textLight: {
        fontSize: 14,
        color: 'gray'
    }
})

export default ContactListItem;
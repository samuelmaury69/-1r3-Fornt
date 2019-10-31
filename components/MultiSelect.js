import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import SectionedMultiSelect from './react-native-sectioned-multi-select/lib/sectioned-multi-select';

class MultiSelect extends PureComponent {

	render(){
		const { name, ...rest }=this.props;
		return <View style={styles.container}>
					 <SectionedMultiSelect {...rest}
                          uniqueKey='id'
                          subKey='children'
                          showDropDowns={false}
                          readOnlyHeadings={true}/>
             </View>;
	}
}
const styles = StyleSheet.create({
  container: {
  	marginTop:10,
    width:'80%',
  },
});
export default MultiSelect;
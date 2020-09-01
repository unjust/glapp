import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MenuOptionComponent from './MenuOptionComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

const openIcon = <Icon name="caret-down" size={30} color="#900" />;
const closeIcon = <Icon name="caret-up" size={30} color="#900" />;

export default class MenuComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
      selectedOptions: []
    }
  }

  onMenuButtonClicked = () => {
    const isMenuOpen = !this.state.isMenuOpen;
    this.setState({ isMenuOpen });
  }

  onOptionClicked(clickedOption) {
    const currentSelectedOptions = this.state.selectedOptions;
    const index = currentSelectedOptions.indexOf(clickedOption);
    if (index > -1) {
      currentSelectedOptions.splice(index, 1);
    } else {
      currentSelectedOptions.push(clickedOption);
    }
    const selectedOptions = Array.from(new Set(currentSelectedOptions));
    this.setState({ selectedOptions });
    this.props.onMenuOptionClicked(clickedOption, selectedOptions);
  }

  render() {
    const { menuOptions } = this.props;
    const selectedOptions = this.state.selectedOptions;

    const optionComponents = menuOptions.map((option) => {
      return <MenuOptionComponent 
              style={[ styles.menuOption, this.state.selectedOptions.includes(option) ? styles.selected : styles.deselected ]} 
              onClick={(isSelected) => this.onOptionClicked(option, isSelected)}
              isSelected={selectedOptions.indexOf(option) > -1}
              key={option}
              text={option} />
      });

    return (
      <View style={styles.menuContainer}>
        <View style={[ styles.flexRow, styles.justifyEnd ]}>
          <TouchableOpacity
            style={[ styles.flexRow, styles.menuControl, styles.menuOption ]}
            onPress={this.onMenuButtonClicked}>
            { this.state.isMenuOpen ? openIcon : <Text>Layers</Text> }
          </TouchableOpacity>
        </View>
        { this.state.isMenuOpen &&
          <View style={styles.menuOptionsContainer}>
            {optionComponents}
          </View>
        }
      </View>
    );
  }
}

MenuComponent.propTypes = {
  menuOption: PropTypes.array,
  onMenuOptionClicked: PropTypes.func
};

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  menuContainer: {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    right: 0,
    //height: 200
  },
  menuOptionsContainer: {
    display: "flex",
  },
  menuControl: {
    color: "black",
    justifyContent: "center",
    borderRadius: 8,
    margin: 10
  },
  menuOption: {
    marginTop: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    width: 100,
  },
  deselected: {
    color: 'black'
  },
  selected: {
    // backgroundColor: "#CCCCCC",
  }
});
import React from 'react'
import { View } from 'react-native'

import BaseForm from '../BaseForm'
import { Input, Button } from '../../Structure'

class Scan extends BaseForm {
  submit = () => {
    this.props.onScan(this.state.userIdentification, this.state.registrationNumber)
  }

  renderResetRegistrationNumberLink = () => {
    return (
      <Button
        onPress={this.props.onResetRegistrationNumberClick}
        style={this.props.scanResetRegistrationNumberLinkStyle}
        textStyle={this.props.scanResetRegistrationNumberLinkTextStyle}
        text={this.props.labels.forgotRegistrationNumber}
      />
    )
  }

  render () {
    return (
      <View style={this.props.scanFormWrapperStyle}>
        { this.renderLogo() }

        <View style={this.props.fieldsetWrapperStyle}>
          <Input
            icon={this.props.registrationNumberInputIcon}
            iconStyle={this.props.inputIconStyle}
            onChangeText={this.handleInputChange('RegistrationNumber')}
            secureTextEntry
            label={this.props.labels.registrationNumber}
            wrapperStyle={this.props.inputWrapperStyle}
            style={this.props.inputStyle}
            placeholderTextColor={this.props.inputPlaceholderTextColor}
          />
        </View>

        {
          this.props.haveResetRegistrationNumber ? this.renderResetRegistrationNumberLink() : null
        }

        <Button
          onPress={this.submit}
          style={[
            this.props.baseButtonStyle,
            this.props.scanFormSubmitButtonStyle
          ]}
          textStyle={[
            this.props.baseButtonTextStyle,
            this.props.scanFormSubmitButtonTextStyle
          ]}
          text={this.props.labels.scanFormButton}
        />

      </View>
    )
  }
}

export default Scan

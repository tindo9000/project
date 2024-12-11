import React from 'react'
import { View } from 'react-native'

import BaseForm from '../BaseForm'
import { Input, Button } from '../../Structure'

class ResetRegistrationNumber extends BaseForm {
  submit = () => {
    this.props.onResetRegistrationNumber(this.state.userIdentification)
  }

  renderHeader = () => {
    if (this.props.resetRegistrationNumberHeaderRenderer) {
      return this.props.resetRegistrationNumberHeaderRenderer(this.props.onBackClick)
    }

    return (
      <Button
        onPress={this.props.onBackClick}
        style={this.props.backButtonStyle}
        textStyle={this.props.backButtonTextStyle}
        text={this.props.labels.back}
      />
    )
  }

  render () {
    return (
      <View style={this.props.resetRegistrationNumberFormWrapperStyle}>
        { this.renderHeader() }

        { this.renderLogo() }

        <View style={this.props.fieldsetWrapperStyle}>
          <Input
            icon={this.props.userIdentificationInputIcon}
            iconStyle={this.props.inputIconStyle}
            onChangeText={this.handleInputChange('userIdentification')}
            label={this.props.labels.userIdentification}
            wrapperStyle={this.props.inputWrapperStyle}
            style={this.props.inputStyle}
            placeholderTextColor={this.props.inputPlaceholderTextColor}
          />
        </View>

        <Button
          onPress={this.submit}
          style={[
            this.props.baseButtonStyle,
            this.props.resetRegistrationNumberFormSubmitButtonStyle
          ]}
          textStyle={[
            this.props.baseButtonTextStyle,
            this.props.resetRegistrationNumberFormSubmitButtonTextStyle
          ]}
          text={this.props.labels.forgotRegistrationNumberFormButton}
        />

      </View>
    )
  }
}

export default ResetRegistrationNumber

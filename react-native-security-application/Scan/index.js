import React, { Component } from 'react'
import DefaultStyles from './DefaultStyles'
import defaultLabels from './constants/defaultLabels'

import { ScanForm, ResetRegistrationNumberForm } from './Forms'

class Scan extends Component {
  constructor (props) {
    super(props)
    this.state = {resetRegistrationNumberActive: false}
  }

  changeToResetRegistrationNumberForm = () => {
    this.setState({resetRegistrationNumberActive: true})
  }

  changeToScanForm = () => {
    this.setState({resetRegistrationNumberActive: false})
  }

  getLabels = () => {
    return {
      ...defaultLabels,
      ...this.props.labels
    }
  }

  onScan = (userIdentification, registrationNumber) => {
    this.props.onScan(userIdentification, registrationNumber)
  }

  onResetRegistrationNumber = (userIdentification) => {
    this.props.onResetRegistrationNumber(userIdentification)
    this.changeToScanForm()
  }

  renderResetRegistrationNumber = () => {
    return (
      <ResetRegistrationNumberForm
        {...this.props}
        labels={this.getLabels()}
        onBackClick={this.changeToScanForm}
        onResetRegistrationNumber={this.onResetRegistrationNumber}
        showLogo={this.props.showLogoOnResetRegistrationNumber}
      />
    )
  }

  renderScanForm = () => {
    return (
      <ScanForm
        {...this.props}
        haveResetRegistrationNumber={!!this.props.onResetRegistrationNumber}
        labels={this.getLabels()}
        onResetRegistrationNumberClick={this.changeToResetRegistrationNumberForm}
        onScan={this.onScan}
        showLogo={this.props.showLogoOnScan}
      />
    )
  }

  render () {
    if (this.state.resetRegistrationNumberActive && this.props.onResetRegistrationNumber) {
      return this.renderResetRegistrationNumber()
    }

    return this.renderScanForm()
  }
}

Scan.propTypes = {
  labels: React.PropTypes.object,
  logoImage: React.PropTypes.any,
  onScan: React.PropTypes.func.isRequired,
  onResetRegistrationNumber: React.PropTypes.func,
  registrationNumberInputIcon: React.PropTypes.any,
  resetRegistrationNumberHeaderRenderer: React.PropTypes.func,
  showLogoOnScan: React.PropTypes.bool,
  showLogoOnResetRegistrationNumber: React.PropTypes.bool,
  userIdentificationInputIcon: React.PropTypes.any,
  inputPlaceholderTextColor: React.PropTypes.string,

  backButtonStyle: React.PropTypes.any,
  backButtonTextStyle: React.PropTypes.any,
  baseButtonStyle: React.PropTypes.any,
  baseButtonTextStyle: React.PropTypes.any,
  inputIconStyle: React.PropTypes.any,
  scanResetRegistrationNumberLinkStyle: React.PropTypes.any,
  scanResetRegistrationNumberLinkTextStyle: React.PropTypes.any,
  fieldsetWrapperStyle: React.PropTypes.any,
  inputWrapperStyle: React.PropTypes.any,
  inputStyle: React.PropTypes.any,
  scanFormSubmitButtonStyle: React.PropTypes.any,
  scanFormSubmitButtonTextStyle: React.PropTypes.any,
  scanFormWrapperStyle: React.PropTypes.any,
  logoStyle: React.PropTypes.any,
  resetRegistrationNumberFormWrapperStyle: React.PropTypes.any,
  resetRegistrationNumberFormSubmitButtonTextStyle: React.PropTypes.any,
  resetRegistrationNumberFormSubmitButtonStyle: React.PropTypes.any
}

Scan.defaultProps = {
  labels: {},
  showLogoOnScan: true,
  showLogoOnResetRegistrationNumber: true,
  inputPlaceholderTextColor: '#ccc',
  userIdentificationInputIcon: require('./Images/email_icon.png'),
  registrationNumberInputIcon: require('./Images/registration_number_icon.png'),
  backButtonStyle: DefaultStyles.backButton,
  backButtonTextStyle: DefaultStyles.backButtonText,
  baseButtonStyle: DefaultStyles.baseButton,
  baseButtonTextStyle: DefaultStyles.baseButtonText,
  fieldsetWrapperStyle: DefaultStyles.fieldsetWrapper,
  inputIconStyle: DefaultStyles.inputIcon,
  inputStyle: DefaultStyles.input,
  inputWrapperStyle: DefaultStyles.inputWrapper,
  scanFormWrapperStyle: DefaultStyles.formWrappper,
  scanResetRegistrationNumberLinkStyle: DefaultStyles.scanResetRegistrationNumberLink,
  scanResetRegistrationNumberLinkTextStyle: DefaultStyles.scanResetRegistrationNumberLinkText,
  logoStyle: DefaultStyles.logo,
  resetRegistrationNumberFormSubmitButtonStyle: DefaultStyles.resetRegistrationNumberFormSubmitButton,
  resetRegistrationNumberFormWrapperStyle: DefaultStyles.formWrappper
}

export default Scan

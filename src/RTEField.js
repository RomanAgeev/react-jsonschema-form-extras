import React, { Component } from "react";
import RichTextEditor from "react-rte";

const DEFAULT_FORMAT = "html";

export default class RTEField extends Component {
  constructor(props) {
    super(props);

    let {
      formData = "",
      uiSchema: { rte: { format = DEFAULT_FORMAT } = {} },
    } = props;

    this.state = {
      value: RichTextEditor.createValueFromString(formData, format),
    };
  }

  updateFormData = () => {
    let {
      uiSchema: { rte: { format = DEFAULT_FORMAT } = {} },
      onChange,
    } = this.props;
    let { value } = this.state;
    if (onChange) {
      onChange(value.toString(format));
    }
  };

  handleChange = value => {
    let { uiSchema: { updateOnBlur = false } } = this.props;
    this.setState({ value }, () => !updateOnBlur && this.updateFormData());
  };

  handleBlur = () => {
    let { uiSchema: { updateOnBlur = false } } = this.props;
    if (updateOnBlur) {
      this.updateFormData();
    }
  };

  componentWillUnmount() {
    this.handleBlur();
  }

  render() {
    let { uiSchema: { rte } } = this.props;

    return (
      <div onBlur={this.handleBlur}>
        <RichTextEditor
          {...rte}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

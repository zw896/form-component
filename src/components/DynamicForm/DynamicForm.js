import React, { Component } from "react";
import { bmiReferenceProps, headCircumferenceReferenceProps } from "./JsonData";
import Input from "../Input/Input";
import "./DynamicForm.css";

export default class DynamicForm extends Component {
  constructor(props) {
    super(props);
    const { id, dataElements, observationName } = bmiReferenceProps;
    // Object that would be finally outputted
    const data = dataElements
      .map(vals => vals.id)
      .reduce((obj, key) => ({ ...obj, [key]: "" }), {});

    this.state = {
      isLoading: true,
      id: id || null,
      observationName: observationName || null,
      dataElements: dataElements,
      data,
      valid: false,
      errors: {}
    };
  }

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state.data);
  };

  render() {
    const { dataElements, data, observationName, errors } = this.state;
    let selectedOption,
      defaultValue = "";
    let title = this.props.title || "Form";

    return (
      <div className="form">
        <form className="form-field" onSubmit={this.onSubmit}>
          <h1 id="message">{observationName}</h1>
          {dataElements.map(
            // dataElements
            v => {
              if (v.display) {
                if (v.type == "select") {
                  selectedOption = v.options.map(opt => {
                    if (opt.isDefault) defaultValue = opt.name;
                    return {
                      value: opt.id,
                      label: opt.name
                    };
                  });
                }

                return (
                  <div className="form-input" key={v.id}>
                    <h3>{`${v.displayName} ${
                      v.unitOfMeasure ? ` (${v.unitOfMeasure})` : ""
                    }`}</h3>
                    <Input
                      type={v.type}
                      name={v.id}
                      bounds={v.bounds}
                      options={selectedOption}
                      placeholder={v.displayName}
                      value={data[v.id]}
                      default={defaultValue}
                    />
                    
                  </div>
                );
              }
            }
          )}
          <div className="form-group">
            <button className="submit" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

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

  handleChange = event => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });
  };

  handleSelectChange = (event, id) => {
    this.setState({
      data: {
        ...this.state.data,
        [id]: event.value
      }
    });
  };

  validateForm = data => {
    const errorMessgage = {};
    this.state.dataElements.forEach(dataElement => {
      // If the input value is empty
      if (dataElement.isRequired && !data[dataElement.id])
        errorMessgage[dataElement.id] = `${dataElement.displayName} can't be blank.`;
      // Validate name
      if (dataElement.id === "name" && data[dataElement.id]) {
        //console.log(data[dataElement.id]);
        let regexName = /^([a-zA-Z]+\s){1}[a-zA-Z]+$/;
        if (!data[dataElement.id].match(regexName)) {
          errorMessgage[dataElement.id] = "Name shuold be text based and separated by a space.";
        }
      }
      // Validate height and weight
      if (dataElement.bounds && dataElement.id !== "bmi") {
        let regexNum = /[0-9]\S+$/;
        if (!data[dataElement.id].match(regexNum) || data[dataElement.id] > dataElement.bounds.upperLimit) {
          errorMessgage[dataElement.id] = `${dataElement.id} shuold be numbers and less than ${dataElement.bounds.upperLimit}`;
        }
      }
    });

    let dataObj = {...data};
    //! BMI formula: weight / height(m) squared
    dataObj.bmi = dataObj.weight / Math.pow(dataObj.height / 100, 2)
    this.setState({
        errors: errorMessgage,
        data: dataObj
    });
    console.log(errorMessgage);
    return Object.keys(errorMessgage).length === 0;
  };

  onSubmit = event => {
    event.preventDefault();
    const isValid = this.validateForm(this.state.data);
    if (isValid) {
      console.log(this.state.data);
    }
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
                      onChange={this.handleChange}
                      onSelectChange={event =>
                        this.handleSelectChange(event, v.id)}
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

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
        if (
          !data[dataElement.id].match(regexNum) ||
          data[dataElement.id] > dataElement.bounds.upperLimit
        ) {
          errorMessgage[dataElement.id] = `${
            dataElement.id
          } shuold be numbers and less than ${dataElement.bounds.upperLimit}`;
        }
      }
    });

    let dataObj = data;
    // ! BMI formula: weight / height(m) squared
    dataObj.bmi = dataObj.weight / Math.pow(dataObj.height / 100, 2);
    this.setState({
      errors: errorMessgage
    });
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
      
    return (
      <div className="form">
        <form className="form-field" onSubmit={this.onSubmit}>
          <h1 id="message">{observationName}</h1>
          {dataElements.map(dataElement => {
            if (dataElement.display) {
              if (dataElement.type === "select") {
                selectedOption = dataElement.options.map(opt =>
                {
                    if (opt.isDefault) defaultValue = opt.name;
                    return {
                        value: opt.id,
                        label: opt.name
                    };
                });
              }
              return (
                <div className="form-input" key={dataElement.id}>
                  <h3>{`${dataElement.displayName} ${
                    dataElement.unitOfMeasure
                      ? ` (${dataElement.unitOfMeasure})`
                      : ""
                  }`}</h3>
                  <Input
                    type={dataElement.type}
                    name={dataElement.id}
                    bounds={dataElement.bounds}
                    options={selectedOption}
                    placeholder={dataElement.displayName}
                    value={data[dataElement.id]}
                    default={defaultValue}
                    onChange={this.handleChange}
                    onSelectChange={event =>
                      this.handleSelectChange(event, dataElement.id)
                    }
                  />
                  <div className="error">{errors[dataElement.id]}</div>
                </div>
              );
            }
            else
              return null;
          })
        }

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

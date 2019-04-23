import React, { Component } from "react";
import { bmiReferenceProps, headCircumferenceReferenceProps } from "./JsonData";
import Input from "../Input/Input";
import "./DynamicForm.css";

export default class DynamicForm extends Component {
    render() {
        return (
            <div>
                form
                <Input />
            </div>
        )
    }
}
code challenge
## Idea & Problems
- JSON data is a nested array, result should be an object.
- Store the **id** value in **dataElements** into an new object as the key with "" empty value, so it should be 
  ```
  {
      "name": "",
      "gender": "",
      ...etc.
  }
  ```
  _problem: how to create this new object based on "dataElements"?_
- one parent component: DynamicForm, which contains a child component: Input.
1. Parent component DynamicForm has initial state which contains the data read from JSON file given.
2. Pass the data to child component Input as props.
3. In Input component, determine which the input type is: input/number or select. Using react-select for select tag.
4. handleChange/handleSelectChange functions handle the input value from users.
5. Submit button outputs the final object to console.
6. Validate input value that been received.
7. Output error messages.

## PROJECT REQUIREMENTS
- [x] Create a parent component: DynamicForm
- [x] Create a child component: Input
* **In DynamicForm**
- [x] Accept user input
- [x] Submit user input
- [x] Output the final object to console 
- [x] Validate user input
- [x] Error message
- [x] Switch form button
- [x] Calculate bmi value
// import React ,{useState, useReducer} from 'react';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const inputReducer = (state, action) => {
//     switch (action.type) {
//       case "CHANGE":
//         return {
//           ...state,
//           value: action.val,
//           isValid: validate(action.val, action.validators),
//         };
//       case "TOUCH": {
//         return {
//           ...state,
//           isTouched: true,
//         };
//       }
//       default:
//         return state;
//     }
//   };
//   const DatePicker = (props) => {
// const [selectedDate, setSelectedDate] = useState(null);
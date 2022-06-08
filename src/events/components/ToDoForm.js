import React, { useState } from 'react';
import Button from '../../shared/components/FormElements/Button';

const ToDoForm = ({ addActivitate }) => {

    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addActivitate(userInput);
        setUserInput("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input value={userInput} type="text" onChange={handleChange} placeholder="Adaugați activitate..."/>
            <Button>Adăugați</Button>
        </form>
    );
};

export default ToDoForm;
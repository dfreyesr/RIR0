import React from 'react';
import './Components.scss';
import Button from './components/button.js';
import IconButton from './components/icon_button';
import SearchBar from './components/search_bar';
import Text from './components/text';
import Card from './components/card';
import Input from './components/input';
import { useState,useEffect } from 'react';
import Image from './components/image';
import Checkbox from './components/checkbox';

function App() {

  const [name, setName] = useState("");

  const todisplay = {
    image: "https://blog.nasm.org/hubfs/bench-press-form.jpg",
    name:"Fullbody workout",
    description:"this is the description of the fullbody workout for this",
    subdescription:"this is a subdescription"
  }

  function test(name){
    if(typeof name === "string"){
      alert(name);
    }
    else{
      alert("funciona");
    }
  }

  function printInput(){
    alert(name);
  }

  const [checked, setChecked] = useState(true);

  
  return (
    <div className="App">
      <header className="App-header">
        <Button text="Theme 1" onClick={test} theme="primary" />
        <Button text="Theme 2" onClick={test} theme="secondary" />
        <Button text="Theme 3" onClick={test} theme="no-background" />
        <IconButton onClick={test} theme="add"/>
        <IconButton onClick={test} theme="edit"/>
        <IconButton onClick={test} theme="arrow-right"/>
        <IconButton onClick={test} theme="delete"/>
        <Text text="Como estas" variant="heading--bold" />
        <SearchBar onSearch={test}/>
        <Card onClick={test} toDisplay={todisplay}/>
        <Input setInputValue={setName} placeholder="Full Name" type="text" label='Enter here your name' labelHidden="false"/>
        <Input setInputValue={setName} placeholder="Username" type="text"/>
        <Input setInputValue={setName} placeholder="Email" type="email"/>
        <Input inputValue={name} setInputValue={setName} placeholder="Password" type="password" errorlabel='error labelll' validity={true}/>
        <Button text="Print input" onClick={printInput} theme="primary" />
        <Image src={todisplay.image} alt="prueba"/>
        <Image/>
        <Checkbox label="Estoy de acuerdo" isChecked={checked} setChecked={setChecked}/>
      </header>
    </div>
  );
}

export default App;

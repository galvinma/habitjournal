import React from 'react'
import lifecycle from 'react-pure-lifecycle';

// css
import './Login.css'
import '../.././Images/Prompt.css'

// Components
import PromptNavBar from '../.././Components/NavBar/PromptNavBar'
import LogInPrompt from '../.././Components/Prompt/LogInPrompt'

// Images
var prompt_back = require('../.././Images/prompt.svg')

class LogIn extends React.Component {
  render() {
    return (
      <div>
        <PromptNavBar />
        <LogInPrompt />
        <div id="block_one"/>
        <div id="block_two"/>
        <svg viewBox="0 0 100 100" id="prompt_background" alt="" style ={{ backgroundImage: "url("+prompt_back+")" }}/>
      </div>
    )}
}

export default (LogIn);

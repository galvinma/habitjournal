import React from 'react'
import lifecycle from 'react-pure-lifecycle';
import ReactSVG from 'react-svg'

// css
import './Reset.css'
import '../.././Images/Prompt.css'

// Components
import PromptNavBar from '../.././Components/NavBar/PromptNavBar'
import ResetPrompt from '../.././Components/Prompt/ResetPrompt'

// Images
var prompt_back = require('../.././Images/prompt.svg')

class Reset extends React.Component {
  render() {
    return (
      <div>
        <PromptNavBar />
        <ResetPrompt />
        <div id="block_one"/>
        <div id="block_two"/>
        <svg viewBox="0 0 100 100" id="prompt_background" alt="" style ={{ backgroundImage: "url("+prompt_back+")" }}/>
      </div>
  )}
}

export default (Reset);

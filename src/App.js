import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { loadState } from 'redux/load';
import { triggerFlag } from 'redux/flags';
import { resetState } from 'redux/reset';
import { changeResourceAmount } from 'redux/resources'
import { useResource, useFlag } from 'core/hooks/state';
import ActionLog from 'components/ActionLog';

const fun = (n) => {
  const msgs = {
    0: "Hey you added a line",
    1: "Hey another line",
    2: "Yet another line",
    3: "Cool! another line...",
    4: "More lines...",
    5: "Enough lines"
  } 
  return msgs[n] ||  `This is line number ${n + 1} you have added`;
}

const testLines = [
  "This is line 0",
  "This is yet another line",
  "I copy pasted this to see how long lines look",
  "I copy pasted this to see how long lines look",
  "I copy pasted this to see how long lines look",
  "I copy pasted this to see how long lines look",
  "I copy pasted this to see how long lines look"
]

function App() {
  const wood = useResource("wood");
  const isSuper = useFlag("super");
  const dispatch = useDispatch()
  const handleClick = () => dispatch(changeResourceAmount("wood",100))
  const handleFlag = () => dispatch(triggerFlag("super"))
  const handleReset = () => dispatch(resetState())
  useEffect(() => {
    dispatch(loadState())
  },[dispatch])

  const [ lines , setLines ] = useState(testLines)

  const handleAddLine = () => setLines([ ...lines, fun(lines.length - testLines.length)]);

  return (
    <div>
      <div>
      Zack Foss In Production...
      </div>
      <button onClick={handleClick}>Click for wood</button>
      <button onClick={handleFlag}>Click to be {isSuper ? "normal" : "super"}</button>
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        wood: {wood}
      </div>
      <ActionLog
        lines={lines}
      />
      <button onClick={handleAddLine}>Add line</button>
    </div>
  );
}

export default App;

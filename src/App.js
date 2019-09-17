import React, { useReducer, useContext } from 'react'
import './App.css'

const shareReducer = (state, { type, value }) => {
  switch (type) {
    case 'ADD_SHARE':
      return [...state, value]
    default:
      return state
  }
}

const helpReducer = (state, { type, value }) => {
  switch (type) {
    case 'ADD_HELP':
      return [...state, value]
    default:
      return state
  }
}

const pairReducer = (state, { type, value }) => {
  switch (type) {
    case 'ADD_PAIR':
      return [...state, value]
    default:
      return state
  }
}

export const DispatchContext = React.createContext(null)

const App = () => {
  const [shares, dispatchShare] = useReducer(shareReducer, [])
  const [helps, dispatchHelp] = useReducer(helpReducer, [])
  const [pairs, dispatchPair] = useReducer(pairReducer, [])

  const dispatch = action =>
    [dispatchHelp, dispatchShare, dispatchPair].forEach(fn => fn(action))

  return (
    <div className="App">
      <DispatchContext.Provider value={dispatch}>
        <InputSection type="SHARE" state={shares} />
        <InputSection type="HELP" state={helps} />
        <InputSection type="PAIR" state={pairs} />
        <MemoizedOtherComponent state={shares} />
      </DispatchContext.Provider>
    </div>
  )
}

const OtherComponent = ({ state }) => {
  console.log('other component rendering', state)
  return <div>Sharing memoized clone: {state}</div>
}

const MemoizedOtherComponent = React.memo(OtherComponent)

const InputSection = ({ type, state }) => {
  const dispatch = useContext(DispatchContext)
  console.log('type rendering', type)
  return (
    <div>
      {type}
      <div>
        <input
          type="text"
          onKeyDown={val => {
            if (val.keyCode === 13)
              dispatch({ type: `ADD_${type}`, value: val.target.value })
          }}
        />
      </div>
      {state && state.map(item => <div key={item}>{item}</div>)}
    </div>
  )
}

export default App

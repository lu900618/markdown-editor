import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons'
const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const node = useRef(null)
  const closeSearch = (e) => {
    e.preventDefault();
    setInputActive(false)
    setValue('')
  }

  useEffect(() => {
    const handleInputEvent = (event) => {
      const { keyCode } = event
      if (keyCode === 13 && inputActive) { // enter
        onFileSearch(value)
      } else if (keyCode === 27 && inputActive) { // esc
        closeSearch(event)
      }
    }
    document.addEventListener('keyup', handleInputEvent)
    return () => {
      document.removeEventListener('keyup', handleInputEvent)
    }
  })
  useEffect(() => {
    inputActive && node.current.focus()
  }, [inputActive])
  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center">
      {!inputActive &&
        <>
          <span>{title}</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => { setInputActive(true) }}
          >
            <FontAwesomeIcon icon={faSearch} title="搜索" size="lg" />
          </button>
        </>}
      {inputActive &&
        <>
          <input
            ref={node}
            className="form-control"
            value={value}
            onChange={(e) => { setValue(e.target.value) }} />
          <button
            type="button"
            className="icon-button"
            onClick={closeSearch}
          >
            <FontAwesomeIcon icon={faTimes} title="关闭" size="lg" />
          </button>
        </>}
    </div>
  )
}

export default FileSearch
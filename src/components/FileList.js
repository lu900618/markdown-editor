import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState(null)
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)
  const closeSearch = () => {
    setEditStatus(false)
    setValue('')
  }
  useEffect(() => {
    if(enterPressed && editStatus) {
      const editItem = files.find(file => file.id === editStatus)
      onSaveEdit(editItem.id, value)
      closeSearch()
    }
    if (escPressed && editStatus) {
      closeSearch()
    }
  })
  return (
    <ul className="list-group list-group-flush file-list">
      {
        files.map(file => (
          <li className="row mx-0 list-group-item bg-light d-flex align-item-center file-item px-0 text-left" key={file.id}>
            {
              file.id !== editStatus &&
              <>
                <span className="col-2">
                  <FontAwesomeIcon icon={faMarkdown} />
                </span>
                <span
                  className="col-6 c-link"
                  onClick={() => { onFileClick(file.id) }}
                >{file.title}</span>
                <button
                  type="button"
                  className="icon-button col-2"
                  onClick={() => { setEditStatus(file.id); setValue(file.title) }}
                >
                  <FontAwesomeIcon icon={faEdit} title="编辑" />
                </button>
                <button
                  type="button"
                  className="icon-button col-2"
                  onClick={() => { onFileDelete(file.id) }}
                >
                  <FontAwesomeIcon icon={faTrash} title="删除" />
                </button>
              </>
            }
            {
              file.id === editStatus &&
              <>
                <input
                  className="form-control col-10"
                  value={value}
                  onChange={(e) => { setValue(e.target.value) }}
                />
                <button
                  type="button"
                  className="icon-button col-2"
                  onClick={closeSearch}
                >
                  <FontAwesomeIcon icon={faTimes} title="关闭" size="lg" />
                </button>
              </>
            }
          </li>
        ))
      }
    </ul>
  )
}

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onSaveEdit: PropTypes.func,
  onFileDelete: PropTypes.func
}

export default FileList
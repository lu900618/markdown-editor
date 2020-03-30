import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress';
import classNames from 'classnames';
import './TabList.scss';

const TabList = ({ files, activeId, unsavedIds, onTabClick, onTabClose }) => {
  return (
    <ul className="nav nav-pills tablist-components">
      {files.map(file => {
        const withUnsavedMark = unsavedIds.includes(file.id);
        return (
          <li className="nav-item" key={file.id}>
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                onTabClick(file.id);
              }}
              className={classNames('nav-link', {
                active: file.id === activeId,
                'with-unsaved': withUnsavedMark
              })}
            >
              {file.title}
              <span
                className="ml-2 close-icon"
                onClick={event => {
                  event.stopPropagation();
                  onTabClose(file.id);
                }}
              >
                <FontAwesomeIcon icon={faTimes} className="sm" />
              </span>
              {withUnsavedMark && (
                <span className="rounded-circle unsaved-icon ml-2"></span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
TabList.propTypes = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unsavedIds: PropTypes.array,
  inTabClick: PropTypes.func,
  onTabClose: PropTypes.func
};
TabList.defaultProps = {
  unsavedIds: []
};
export default TabList;

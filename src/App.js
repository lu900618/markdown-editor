import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import defaultFiles from './utils/defaultFiles';
import BottomBtn from './components/BottomBtn';
import TabList from './components/TabList';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function App() {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileId, setActiveFileId] = useState('');
  const [openedFileIds, setOpenedFileIds] = useState([]);
  const [unsavedFileIds, setUnsavedFileIds] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);
  const openedFiles = openedFileIds.map(fileId =>
    files.find(f => f.id === fileId)
  );
  const activeFile = files.find(f => f.id === activeFileId);

  const handleFileClick = fileId => {
    setActiveFileId(fileId);
    !openedFileIds.includes(fileId) &&
      setOpenedFileIds([...openedFileIds, fileId]);
    // setUnsavedFileIds([...unsavedFileIds, fileId]);
  };
  const handleTabClick = fileId => {
    setActiveFileId(fileId);
  };
  const handleCloseClick = fileId => {
    const without = openedFileIds.filter(id => id !== fileId);
    setOpenedFileIds(without);
    if (fileId === activeFileId) {
      if (without.length > 0) {
        setActiveFileId(without[without.length - 1]);
      } else {
        setActiveFileId('');
      }
    }
  };
  const handleFileChange = (fileId, value) => {
    const newFiles = files.map(file => {
      if (file.id === fileId) {
        file.body = value;
      }
      return file;
    });
    setFiles(newFiles);
    if (!unsavedFileIds.includes(fileId)) {
      setUnsavedFileIds([...unsavedFileIds, fileId]);
    }
  };
  const handleFileDelete = fileId => {
    const newFiles = files.filter(f => f.id !== fileId);
    setFiles(newFiles);
    handleCloseClick(fileId);
  };
  const handleUpdateTitle = (id, title) => {
    const newFiles = files.map(f => {
      if (f.id === id) {
        f.title = title;
      }
      return f;
    });
    setFiles(newFiles);
  };
  const handleFileSearch = keywords => {
    const newFiles = files.filter(file => file.title.includes(keywords));
    setSearchedFiles(newFiles);
  };
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch
            // title="我的云文档"
            onFileSearch={handleFileSearch}
          />
          <FileList
            files={searchedFiles.length > 0 ? searchedFiles : files}
            onFileClick={handleFileClick}
            onFileDelete={handleFileDelete}
            onSaveEdit={handleUpdateTitle}
          />

          <div className="row no-gutters button-group">
            <div className="col-6">
              <BottomBtn
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={() => {}}
              />
            </div>
            <div className="col-6">
              <BottomBtn
                colorClass="btn-success"
                icon={faFileImport}
                onBtnClick={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel text-left">
          {!activeFile && (
            <div className="start-page">选择或者创建新的 Markdown 文档</div>
          )}
          {activeFile && (
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileId}
                onTabClick={handleTabClick}
                onTabClose={handleCloseClick}
                unsavedIds={unsavedFileIds}
              />
              <SimpleMDE
                key={activeFile?.id}
                className="text-left"
                value={activeFile?.body}
                onChange={value => {
                  handleFileChange(activeFile?.id, value);
                }}
                options={{
                  minHeight: '512px'
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

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
  const openedFiles = openedFileIds.map(fileId =>
    files.find(f => f.id === fileId)
  );
  const activeFile = files.find(f => f.id === activeFileId);
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch
            // title="我的云文档"
            onFileSearch={value => {
              console.log(value);
            }}
          />
          <FileList
            files={files}
            onFileClick={id => {
              console.log(id);
            }}
            onFileDelete={id => {
              console.log(id);
            }}
            onSaveEdit={(id, newVal) => {
              console.log(id, newVal);
            }}
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
                onTabClick={id => {
                  console.log(id);
                }}
                onTabClose={id => {
                  console.log('close-btn clicked', id);
                }}
                unsavedIds={unsavedFileIds}
              />
              <SimpleMDE
                className="text-left"
                value={activeFile?.body}
                onChange={value => {
                  console.log(value);
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

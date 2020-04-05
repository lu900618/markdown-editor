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
import uuidv4 from 'uuid/v4';
import { flattenArray, obj2Arr } from './utils/helper';

function App() {
  const [files, setFiles] = useState(flattenArray(defaultFiles));
  const [activeFileId, setActiveFileId] = useState('');
  const [openedFileIds, setOpenedFileIds] = useState([]);
  const [unsavedFileIds, setUnsavedFileIds] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);
  const filesArr = obj2Arr(files)
  const handleFileClick = (fileId) => {
    setActiveFileId(fileId);
    !openedFileIds.includes(fileId) &&
      setOpenedFileIds([...openedFileIds, fileId]);
    // setUnsavedFileIds([...unsavedFileIds, fileId]);
  };
  const handleTabClick = (fileId) => {
    setActiveFileId(fileId);
  };
  const handleCloseClick = (fileId) => {
    const without = openedFileIds.filter((id) => id !== fileId);
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
    const newFile = { ...files[fileId], body: value };
    setFiles({ ...files, [fileId]: newFile });
    if (!unsavedFileIds.includes(fileId)) {
      setUnsavedFileIds([...unsavedFileIds, fileId]);
    }
  };
  const handleFileDelete = (fileId) => {
    delete files[fileId];
    setFiles(files);
    handleCloseClick(fileId);
  };
  const handleUpdateTitle = (id, title) => {
    const modifiedFile = { ...files[id], title, isNew: false };
    setFiles({ ...files, [id]: modifiedFile });
  };
  const handleFileSearch = (keywords) => {
    const newFiles = filesArr.filter((file) => file.title.includes(keywords));
    setSearchedFiles(newFiles);
  };
  const createNewFile = () => {
    const newId = uuidv4();
    const newFile = {
      id: newId,
      title: '',
      body: '',
      createAt: Date.now(),
      isNew: true,
    };
    setFiles({ ...files, [newId]: newFile });
  };
  const openedFiles = openedFileIds.map((oid) => files.find[oid]);
  const activeFile = files[activeFileId];
  const searchArr = searchedFiles.length > 0 ? searchedFiles : filesArr;
  console.log(searchArr);
  
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch
            // title="我的云文档"
            onFileSearch={handleFileSearch}
          />
          <FileList
            files={searchArr}
            onFileClick={handleFileClick}
            onFileDelete={handleFileDelete}
            onSaveEdit={handleUpdateTitle}
          />

          <div className="row no-gutters button-group">
            <div className="col-6">
              <BottomBtn
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
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
                onChange={(value) => {
                  handleFileChange(activeFile?.id, value);
                }}
                options={{
                  minHeight: '512px',
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

import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import { ReactComponent as SheetList } from '../../assets/sheetList.svg';
import './fileUpload.css';

const FileUpload = ({ name, value, onChange, label, ...rest }) => {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!value) {
      inputRef.current.value = '';
      inputRef.current.src = null;
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = (file) => {
    const totalSize = file.size;
    let loaded = 0;

    const interval = setInterval(() => {
      if (loaded < totalSize) {
        loaded += totalSize / 100;
        const percentage = Math.min(
          100,
          Math.round((loaded / totalSize) * 100)
        );
        setProgress(percentage);
      } else {
        clearInterval(interval);
        setProgress(0);
        onChange({
          target: {
            name,
            value: file,
          },
        });
      }
    }, 1);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
      onChange({
        target: {
          name,
          value: null,
        },
      });
    }
  };

  return (
    <div className="file-upload">
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        {...rest}
        onChange={handleFileChange}
      />
      <span className="file-upload-label">{label || 'Выберите файл'}</span>
      <div className="file-uploader-wrapper">
        <Button onClick={activateInput} type="button">
          <SheetList />
          Выбор файла
        </Button>
        <span className="file-upload-value">
          {!value && !progress && 'Файл не выбран'}
          {!value && !!progress && 'Файл загружается'}
          {value && !progress && `${value?.name}`}
          {!value && !!progress && (
            <span className="file-upload-range-wrapper">
              <span
                className="file-upload-loading-range"
                style={{ width: progress + '%' }}
              />
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default FileUpload;

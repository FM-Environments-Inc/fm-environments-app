import { FC } from 'react';
import { useDropzone } from "react-dropzone";

import { COLORS } from '../../common/colors';

import './dropzone.css';

interface IDropzoneProps {
  onDrop: any; // TODO: fix type
}

export const Dropzone: FC<IDropzoneProps> = (props) => {
  const { onDrop } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='file-upload' {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

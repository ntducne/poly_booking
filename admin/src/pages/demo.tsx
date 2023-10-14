import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const App: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('images[]', file as RcFile);
        });
        formData.append('name', "ahihi");


       

        setUploading(true);
        fetch('http://localhost:8000/api/upload', {
            method: 'POST',
            body:  formData
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('Upload successful.');
            })
            .catch(() => {
                message.error('Upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        listType : "picture",
        multiple: true,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    return (
        <>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <Button onClick={handleUpload} disabled={fileList.length === 0} loading={uploading} style={{ marginTop: 16 }}>
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
        </>
    );
};

export default App;
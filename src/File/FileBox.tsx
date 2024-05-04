import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import './fileBox.css'
import UserContact from '../UserContact/UserContact.tsx';

function FileBox(){
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [header, setHeader] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [fields, setFields] = useState<any[]>([]); 
    const [buttons, setButtons] = useState<any[]>([]); 
    const disFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedFile) {
            handleSubmit();
        }
    }, [selectedFile]); 

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            disFormRef.current?.classList.add('appear'); 
            disFormRef.current?.classList.remove('disAppear');
        }
    };

    const handleSubmit = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    const fileContent = e.target.result.toString();
                    try {
                        const jsonData = JSON.parse(fileContent);
                        if (jsonData.form_name && jsonData.form_name.trim() !== '') {
                            setHeader(jsonData.form_name);
                        } else {
                            setHeader(null);
                        }
                        if (jsonData.form_description && jsonData.form_description.trim() !== '') {
                            setDescription(jsonData.form_description);
                        } else {
                            setDescription(null);
                        }
                        if (jsonData.form_fields && Array.isArray(jsonData.form_fields)) {
                            setFields(jsonData.form_fields);
                        } else {
                            setFields([]);
                        }
                        if (jsonData.form_buttons && Array.isArray(jsonData.form_buttons)) {
                            setButtons(jsonData.form_buttons);
                        } else {
                            setButtons([]);
                        }
                        disFormRef.current?.classList.add('disAppear'); 
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                }
            };
            reader.readAsText(selectedFile);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setHeader(null);
        setDescription(null);
        setFields([]);
        setButtons([]);
        disFormRef.current?.classList.add('disAppear'); 
        disFormRef.current?.classList.remove('appear'); 
    };

    return(
        <div className="fileBox">
            <form className='main-form'>
                <form className='uploadFile'>
                    <input id='file' type="file" name="filename" onChange={handleFileChange} accept=".json"/>
                    <label htmlFor='file'>
                        {selectedFile ? (
                            <>
                                <span className='blue'>{selectedFile.name}</span>
                            </>
                        ) : (
                            <>
                                <span><span className='blue'>Select a file </span>or drag in form</span>
                                <p>Just we accept Json files</p>
                            </>
                        )}
                    </label>
                </form>
                <input className='resetbtn' type="reset" value='Reset' onClick={handleReset}/>
            </form>
            <div id="user-form" className='userContent disAppear' ref={disFormRef}>
                <UserContact header={header} description={description} fields={fields} buttons={buttons}/>
            </div>
        </div>
    )
}
export default FileBox;
import * as React from 'react';
import { useState } from 'react';
import './fileBox.css'
function FileBox(){
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    const fileContent = e.target.result.toString();
                    console.log('File content:', fileContent);
                }
            };
            reader.readAsText(selectedFile);
        }
    };
    return(
        <div className="fileBox">
            <form onSubmit={handleSubmit}>
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
                                <p>PNG, jpg, gif files up to 10 MB in size are available for download</p>
                            </>
                        )}
                    </label>
                </form>
                <input className='resetbtn' type="submit" value='Reset'/>
            </form>
        </div>
    )
}
export default FileBox;
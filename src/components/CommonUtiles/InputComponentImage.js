import { useState } from "react";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const InputComponentImage = ({ label, placeholder, name, errors, getImageUrl, touched }) => {
    const [isImageUploading, setIsImageUploading] = useState(false);
    const uploadImage = async (image, loadingState) => {
        const formData = new FormData();
        formData.append('file', image);
        try {
            loadingState(true)
            const response = await axios.put('https://itgeeks.wrazzle.com/api/shopify/public/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'hostname': 'wrazzle',
                    'location': 'https://www.wrazzle.com',
                },
            });
            toast.success('Image uploaded successfully!');
            loadingState(false)
            const url = response.data.data.path
            console.log(response)
            return url;
        } catch (error) {
            loadingState(false)
            toast.error('Error uploading image!');
            return null;
        }
    };
    return (
        <div className='input-component-text-container'>
            <label className='input-component-text-label'>{label}</label>
            <div className='input-component-text-input'>
                <input type='file' disabled={isImageUploading} onChange={(e) => uploadImage(e.target.files[0], setIsImageUploading).then((res) => { getImageUrl(res); })}
                    placeholder={placeholder}
                    name={name} />
            </div>
            {(errors && touched) && <p className='input-component-errors'>{errors}</p>}
        </div>
    )
}

export { InputComponentImage }
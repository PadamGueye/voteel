import {useDropzone} from 'react-dropzone';
import {useState} from "react";
import uploader from "../assets/upload.png";
import {IoReloadOutline} from "react-icons/io5";
import {IoMdArrowForward} from "react-icons/io";
import Papa from "papaparse";

const FileUpload = ({ setParsedData }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadError, setUploadError] = useState(null);
    const accept = [".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"];
    const onFileUpload = (file) => {
        if (file) {
            const reader = new FileReader();

            reader.onload = (fileEvent) => {
                const csvString = fileEvent.target.result;

                Papa.parse(csvString, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const parsedData = results.data;
                        setParsedData( results.data )
                    },
                    error: (error) => {
                        console.log('Error parsing CSV:', error);
                    },
                });
            };
            reader.readAsText(file, 'UTF-8');
        }
    };
    const mapErrorMessages = (errorCode) => {
        switch (errorCode) {
            case 'file-invalid-type':
                return 'Le type de fichier n\'est pas pris en charge.';
            case 'too-many-files':
                return 'Trop de fichiers sélectionnés. Veuillez n\'en sélectionner qu\'un.';
            case 'file-too-large':
                return 'La taille du fichier est trop importante. Veuillez sélectionner un fichier plus petit.';
            default:
                return 'Erreur lors du téléchargement du fichier.';
        }
    };
    const onDrop = (acceptedFiles, fileRejections) => {
        setUploadedFiles(acceptedFiles);
        if (fileRejections.length > 0) {
            setUploadError(fileRejections);
        }
    }
    const resetUpload = () => {
        setUploadedFiles([]);
        setUploadError(null);
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        open,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone({
        onDrop: onDrop,
        accept: {accept},
        maxFiles: 1,
        multiple: false,
        maxSize: 2 * 1024 * 1024,
    });

    return (
        <div className={"w-[90%] md:w-[60%] flex flex-col gap-4 justify-center items-center"}>
            <div
                {...getRootProps()}
                className={` ${
                    isDragAccept ? 'bg-green-100 border-green-700 ' : ''
                } ${
                    isDragReject ? 'bg-red-100 border-red-700 ' : ''
                } ${
                    isDragActive ? 'bg-blue-100 border-blue-700 ' : 'border-gray-400'
                } p-3 w-[100%] border-2 border-dashed gap-2 flex flex-col justify-center items-center rounded-xl cursor-pointer`}
            >
                <input {...getInputProps()} />
                <div><img className={"shadow-sm"} src={uploader} alt={"uploader"} /></div>
                {isDragActive ? (
                    <p className="dropzone-content">
                        Laisser pour déposer le fichier ici !
                    </p>
                ) : (
                    <div className={"text-sm text-gray-600 text-center"}>
                        Glissez votre fichier CSV ici, ou <span onClick={open} className={"text-primary-2"}> cliquez !</span>
                    </div>
                )}
                <div className={"text-sm text-gray-400"}>
                    CSV (Max - 2Mo)
                </div>
                <div className={"text-sm text-primary-2"}>
                    {uploadedFiles[0]?.name}
                </div>

                {uploadError && (
                    <div className={'text-sm text-center text-red-500'}>
                        Erreur lors du téléchargement :{' '}
                        {uploadError[0].errors.map((error) => {
                            return `${mapErrorMessages(error.code)}`;
                        }).join(', ')}
                    </div>
                )}
            </div>
            <div className={"flex justify-center items-center gap-5"}>
                {(uploadError || (uploadedFiles.length > 0))&& (
                    <div className={"flex flex-col justify-center items-center"}>
                        <div onClick={resetUpload} className={"p-2 bg-red-50 hover:bg-red-100 hover:animate-spin rounded-[50%] cursor-pointer"}>
                            <IoReloadOutline className={"text-red-400 text-xl"}/>
                        </div>
                        <p className={"text-sm text-gray-400"}>Retry</p>
                    </div>
                )}

                {(uploadedFiles.length > 0) && !uploadError && (
                    <div className={"flex flex-col justify-center items-center"}>
                        <div onClick={()=>{onFileUpload(acceptedFiles[0])}} className={"p-2 bg-blue-100 hover:bg-blue-200 rounded-[50%] cursor-pointer"}>
                            <IoMdArrowForward className={"text-primary-2 text-xl"}/>
                        </div>
                        <p className={"text-sm text-gray-400"}>Suivant</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
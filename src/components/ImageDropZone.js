import React, { useCallback } from 'react'
import {useDropzone} from 'react-dropzone'
import { Box } from '@chakra-ui/react'

const ImageDropZone = () => {
    const {getRootProps, getInputProps, isDragActive} = useDropzone()

    return (
        <Box {...getRootProps()}  w="100%" p={4} color="white" border="1px" borderColor="gray.200" borderStyle="dashed" m="10px" borderRadius="10px" p="40px">
            <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop image here..</p> :
                    <p>Select files or just drop them here..</p>
                }
        </Box>
    )
}

export default ImageDropZone

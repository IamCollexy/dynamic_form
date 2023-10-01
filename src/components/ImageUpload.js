import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { CloudUpload } from '@mui/icons-material';

const ImageUpload = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result) => {
      console.log(result);
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="zpd3lf1a"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 border-dashed border-2  flex flex-col justify-center items-center h-[500px] "
          >
            {!value && <CloudUpload />}

            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  // fill
                  width={120}
                  height={120}
                  style={{
                    objectFit: 'cover',
                  }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;

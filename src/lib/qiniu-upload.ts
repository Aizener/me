const UPLOAD_URL = 'https://up-z2.qiniup.com';

export const updloadFileToQiniu = async ({
  file,
  token,
  fileName,
}: {
  file: File;
  token: string;
  fileName: string;
}): Promise<{ hash: string; key: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('token', token);
  formData.append('fileName', fileName);
  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());
};

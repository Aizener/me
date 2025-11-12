import { requestGet } from '../request';

export const getQiniuToken = async () => {
  const res = await requestGet<string>('/api/qiniu/token');
  return res;
};

// export const uploadFileToQiniu = async (formData: FormData) => {
//   const res = await request('/api/qiniu/update', {
//     body: formData,
//     method: 'POST',
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return res;
// };

import qiniu from 'qiniu';

import { responseJSON } from '@/lib/api-server';

const SCOPE = 'iamcola';
const TOKEN_EXPIRES = 10;
const temp = { token: '', time: 0 };

const getMac = () => {
  const accessKey = process.env.ACCESS_KEY!;
  const secretKey = process.env.SECRET_KEY!;
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  return mac;
};

const getToken = () => {
  const now = Date.now();

  if (now - temp.time < TOKEN_EXPIRES * 1000) {
    return temp.token;
  }

  const options = {
    scope: SCOPE,
    expires: TOKEN_EXPIRES,
  };
  const mac = getMac();
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  temp.time = now;
  temp.token = uploadToken;

  return temp.token;
};

export async function GET() {
  return responseJSON(getToken());
}

/**
 * eK1x8RlkIM8V4w3uGP_gtpYKOr3n_CvnZsWchXAZ:zlzE407uOMrJ6jE1tKWNG4wIsao=:eyJzY29wZSI6ImlhbWNvbGEiLCJkZWFkbGluZSI6MTc2MjkzODEyM30=
 * eK1x8RlkIM8V4w3uGP_gtpYKOr3n_CvnZsWchXAZ:zlzE407uOMrJ6jE1tKWNG4wIsao=:eyJzY29wZSI6ImlhbWNvbGEiLCJkZWFkbGluZSI6MTc2MjkzODEyM30=
 * eK1x8RlkIM8V4w3uGP_gtpYKOr3n_CvnZsWchXAZ:oIzo-nZhOh6AzULeHQQJtGr5G9I=:eyJzY29wZSI6ImlhbWNvbGEiLCJkZWFkbGluZSI6MTc2MjkzMDk3MX0=
 * eK1x8RlkIM8V4w3uGP_gtpYKOr3n_CvnZsWchXAZ:5I4M0GfH_8nqFHAk1_SoWklHj4Y=:eyJzY29wZSI6ImlhbWNvbGEiLCJkZWFkbGluZSI6MTc2MjkzMDk4Nn0=
 * eK1x8RlkIM8V4w3uGP_gtpYKOr3n_CvnZsWchXAZ:DuWD0rhF-UHDS6YmX-Oa-NSQHKc=:eyJzY29wZSI6ImlhbWNvbGEiLCJkZWFkbGluZSI6MTc2MjkzMTAwMn0=
 * eK1x8RlkIM8V4w3uGP_gtpYKOr3n_CvnZsWchXAZ:DuWD0rhF-UHDS6YmX-Oa-NSQHKc=:eyJzY29wZSI6ImlhbWNvbGEiLCJkZWFkbGluZSI6MTc2MjkzMTAwMn0=
 * eK1x8RlkIM8V4w3uGP_gtpYKOr3n_CvnZsWchXAZ:PhdK6ZBnBDG441LkXcwn-ua7eY0=:eyJzY29wZSI6ImlhbWNvbGEiLCJkZWFkbGluZSI6MTc2MjkzMTAzOH0=
 */

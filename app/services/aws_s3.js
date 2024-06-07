const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

function convertUtf8(filename) {
  return Buffer.from(filename, "latin1").toString("utf8").toLowerCase();
}

class S3Service {
  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file) {
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Body: file.buffer,
      Key: convertUtf8(file.originalname),
      ContentType: file.mimetype,
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));
  }

  async getSignedUrl(key) {
    const signedUrl = await getSignedUrl(
      this.s3Client,
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
      { expiresIn: 60 } // 60 seconds
    );

    return signedUrl;
  }

  async listFiles() {
    const bucketParams = {
      Bucket: BUCKET_NAME,
    };

    const response = await this.s3Client.send(
      new ListObjectsV2Command(bucketParams)
    );
    const keys = response.Contents.map((item) => item.Key);

    return keys;
  }

  async deleteFile(key) {
    const headParams = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    await this.s3Client.send(new HeadObjectCommand(headParams));

    const deleteParams = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    await this.s3Client.send(new DeleteObjectCommand(deleteParams));
  }
}

module.exports = S3Service;

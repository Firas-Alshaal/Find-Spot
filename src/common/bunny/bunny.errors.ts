export default class BunnyErrors {
  public static uploadingFileError = (message?: string) => ({
    errorCode: 7000,
    message: message ? message : 'Error in uploading file to bunny',
  });

  public static deletingFileError = (message?: string) => ({
    errorCode: 7001,
    message: message ? message : 'Error in deleting file from bunny',
  });
}

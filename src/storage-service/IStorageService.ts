export interface IStorageService {
  upload(
    file: File,
    path: string,
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>,
    onError: (error: any) => void,
    onComplete: () => void
  ): Promise<void>;

  download(path: string): Promise<void>;

  delete(path: string): Promise<void>;
}

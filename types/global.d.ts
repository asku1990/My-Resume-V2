interface FileSystemFileHandle {
  getFile(): Promise<File>;
}

interface Window {
  showOpenFilePicker(options?: {
    types?: { description: string; accept: Record<string, string[]> }[];
  }): Promise<FileSystemFileHandle[]>;
} 
export default function supportWindowsPath(filePath: string): string {
    return filePath.replace(/\\/g, '/');
}

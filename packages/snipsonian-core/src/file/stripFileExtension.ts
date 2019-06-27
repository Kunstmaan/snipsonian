export default function stripFileExtension(fileName: string): string {
    return fileName.replace(/\.[^/.]+$/, '');
}
